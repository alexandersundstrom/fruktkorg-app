import net.lightbody.bmp.BrowserMobProxy;
import net.lightbody.bmp.BrowserMobProxyServer;
import net.lightbody.bmp.client.ClientUtil;
import net.lightbody.bmp.proxy.CaptureType;
import org.apache.commons.io.FileUtils;
import org.junit.*;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.util.List;


public class ChromeTest {

    private static WebDriver driver;
    private final String BASE_URL = "http://localhost:8080";
    private static final String SCREENSHOT_FOLDER = "Test Screenshots";

    //PAGINATION FIELDS
    private WebElement firstPageButton;
    private WebElement previousPageButton;
    private WebElement nextPageButton;
    private WebElement lastPageButton;

    private Select limitSelector;

    private WebElement pageInfo;
    private final String ID_PAGEINFO = "pageInfo";

    //TABLE FIELDS
    private WebElement table;
    private final String ID_TABLE = "full-width-table";
    private static final String XPATH_FIRST_ROW_AND_FIRST_COLUMN = "//tr[1]/td[1]";

    //OTHER FIELDS
    private final String ID_SEARCH_FRUKT_TAB = "menu_searchfrukt";
    private final String ID_TEXTFIELD_SEARCH = "search";


    @Rule
    public TestWatcher screenshotRule = new TestWatcher() {
        @Override
        protected void failed(Throwable e, Description description) {

            File reportsDirectory = new File(SCREENSHOT_FOLDER);
            if (!reportsDirectory.exists()) {
                reportsDirectory.mkdir();
            }

            String methodName = description.getMethodName();
            String fileName = description.getTestClass().getSimpleName() + "." + methodName + ".png";

            try {
                File destiny = new File(SCREENSHOT_FOLDER + "/" + fileName);
                FileUtils.copyFile(((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE), destiny);
            } catch (IOException ioe) {
                throw new RuntimeException(ioe);
            }
        }
    };

    @BeforeClass
    public static void setUp() throws IOException {

        File reportsDirectory = new File(SCREENSHOT_FOLDER);
        if (reportsDirectory.exists()) {
            FileUtils.cleanDirectory(reportsDirectory);
        }

        // start the proxy
        BrowserMobProxy proxy = new BrowserMobProxyServer();
        proxy.start(0);
        proxy.enableHarCaptureTypes(CaptureType.REQUEST_CONTENT, CaptureType.RESPONSE_CONTENT);
        proxy.addHeader("X-PERSONR", "19880301-1234");

        // get the Selenium proxy object
        Proxy seleniumProxy = ClientUtil.createSeleniumProxy(proxy);

        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setCapability(CapabilityType.PROXY, seleniumProxy);
        chromeOptions.setCapability(CapabilityType.ACCEPT_INSECURE_CERTS, true);
        chromeOptions.addArguments("--headless");

        System.setProperty("webdriver.chrome.driver", ChromeTest.class.getResource("chromedriver").getFile());
        driver = new ChromeDriver(chromeOptions);
        driver.manage().window().setSize(new Dimension(2048, 1356));
    }

    @Test
    public void searchAndSortFruktkorg() {

        driver.get(BASE_URL);

        WebElement searchTab = waitAndGetElementById(ID_SEARCH_FRUKT_TAB);
        searchTab.click();

        waitAndGetElementById(ID_TEXTFIELD_SEARCH).sendKeys("Päron" + Keys.ENTER);

        table = waitAndGetElementByClassName(ID_TABLE);
        waitForTextByXPath(XPATH_FIRST_ROW_AND_FIRST_COLUMN, "Kafferummet 101");

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals(10, rows.size());

        String ID_NAME_TOGGLE = "sort-by-name";
        waitAndGetElementById(ID_NAME_TOGGLE).click();
        waitForTextByXPath(XPATH_FIRST_ROW_AND_FIRST_COLUMN, "96");
    }

    @Test
    public void searchAndChangeItemsPerPage() {
        driver.get(BASE_URL);

        waitAndGetElementById(ID_SEARCH_FRUKT_TAB)
                .click();

        waitAndGetElementById(ID_TEXTFIELD_SEARCH)
                .sendKeys("Päron" + Keys.ENTER);

        getAllPaginationElements();

        Assert.assertTrue(elementHasClass("disabled", firstPageButton));
        Assert.assertTrue(elementHasClass("disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass("disabled", lastPageButton));
        Assert.assertEquals("Default select value not correct", "10", limitSelector.getFirstSelectedOption().getText());
        Assert.assertEquals("Visar 1-10 av 100", pageInfo.getText());

        limitSelector.selectByValue("25");

        this.pageInfo = waitAndGetElementById(ID_PAGEINFO);
        Assert.assertEquals("Visar 1-25 av 100", this.pageInfo.getText());

        table = waitAndGetElementByClassName(ID_TABLE);

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals(25, rows.size());
    }

    @Test
    public void searchAndChangePage() {
        driver.get(BASE_URL);

        waitAndGetElementById(ID_SEARCH_FRUKT_TAB)
                .click();

        waitAndGetElementById(ID_TEXTFIELD_SEARCH)
                .sendKeys("Päron" + Keys.ENTER);

        getAllPaginationElements();

        nextPageButton.click();
        getAllPaginationElements();

        Assert.assertEquals("Visar 11-20 av 100", this.pageInfo.getText());
        Assert.assertFalse(elementHasClass("disabled", firstPageButton));
        Assert.assertFalse(elementHasClass("disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass("disabled", lastPageButton));

        lastPageButton.click();
        getAllPaginationElements();

        Assert.assertEquals("Visar 91-100 av 100", this.pageInfo.getText());
        Assert.assertFalse(elementHasClass("disabled", firstPageButton));
        Assert.assertFalse(elementHasClass("disabled", previousPageButton));
        Assert.assertTrue(elementHasClass("disabled", nextPageButton));
        Assert.assertTrue(elementHasClass("disabled", lastPageButton));

        this.previousPageButton.click();
        getAllPaginationElements();

        Assert.assertEquals("Visar 81-90 av 100", this.pageInfo.getText());
        Assert.assertFalse(elementHasClass("disabled", firstPageButton));
        Assert.assertFalse(elementHasClass("disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass("disabled", lastPageButton));

        firstPageButton.click();
        getAllPaginationElements();

        Assert.assertEquals("Visar 1-10 av 100", this.pageInfo.getText());
        Assert.assertTrue(elementHasClass("disabled", firstPageButton));
        Assert.assertTrue(elementHasClass("disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass("disabled", lastPageButton));

        nextPageButton.click();
        getAllPaginationElements();

        Assert.assertEquals("Visar 11-20 av 100", this.pageInfo.getText());
        Assert.assertFalse(elementHasClass("disabled", firstPageButton));

        limitSelector.selectByValue("25");
        getAllPaginationElements();

        Assert.assertEquals("Visar 26-50 av 100", this.pageInfo.getText());
        Assert.assertFalse(elementHasClass("disabled", firstPageButton));
        Assert.assertFalse(elementHasClass("disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass("disabled", lastPageButton));

    }

    @Test
    public void searchReturnsNoItems() {
        driver.get(BASE_URL);

        waitAndGetElementById(ID_SEARCH_FRUKT_TAB)
                .click();

        waitAndGetElementById(ID_TEXTFIELD_SEARCH)
                .sendKeys("Jordgubbar" + Keys.ENTER);

        Assert.assertFalse(isIdPresent(ID_TABLE));
        //PAGINATION ELEMENTS
        String ID_PAGINATION_CONTAINER = "pagination-container";
        Assert.assertFalse(isIdPresent(ID_PAGINATION_CONTAINER));

        WebElement noItemsTextElement = waitAndGetElementByClassName("no-items");
        Assert.assertEquals("Inga fruktkorgar hittade.", noItemsTextElement.getText());
    }

    @Test
    public void changeTheme() {
        driver.get(BASE_URL);
        Assert.assertTrue(isClassPresent("theme-standard"));

        Select themeSelector = getSelect("theme-selector");
        themeSelector.selectByValue("theme-high-contrast");

        Assert.assertTrue(isClassPresent("theme-high-contrast"));

    }

    @AfterClass
    public static void cleanUp() {
        if (driver != null) {
            driver.close();
            driver.quit();
        }
    }

    private WebElement waitAndGetElementById(String id) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id)));
        return driver.findElement(By.id(id));
    }

    private WebElement waitAndGetElementByClassName(String className) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.ByClassName.className(className)));
        return driver.findElement(By.ByClassName.className(className));

    }

    private boolean isIdPresent(String id) {
        return driver.findElements(By.id(id)).size() > 0;
    }

    private boolean isClassPresent(String className) {
        return driver.findElements(By.className(className)).size() > 0;
    }

    private void waitForTextByXPath(String path, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.textToBePresentInElement(By.xpath(path), text));
    }

    private boolean elementHasClass(String className, WebElement element) {
        return element.getAttribute("class").contains(className);
    }

    private Select getSelect(String id) {
        return new Select(waitAndGetElementById(id));
    }

    private void getAllPaginationElements() {
        this.firstPageButton = waitAndGetElementById("firstPageButton");
        this.previousPageButton = waitAndGetElementById("previousPageButton");
        this.lastPageButton = waitAndGetElementById("lastPageButton");
        this.nextPageButton = waitAndGetElementById("nextPageButton");
        this.limitSelector = getSelect("limitSelector");
        this.pageInfo = waitAndGetElementById(ID_PAGEINFO);
    }
}