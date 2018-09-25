import net.lightbody.bmp.BrowserMobProxy;
import net.lightbody.bmp.BrowserMobProxyServer;
import net.lightbody.bmp.client.ClientUtil;
import net.lightbody.bmp.proxy.CaptureType;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;


public class ChromeTest {

    private static WebDriver driver;
    private static BrowserMobProxy proxy;
    private static final String FIRST_ROW_AND_FIRST_COLUMN = "//tr[1]/td[1]";

    private final String ID_PAGINATION_CONTAINER = "pagination-container";

    private WebElement firstPageButton;
    private final String ID_FIRST_PAGE_BUTTON = "firstPageButton";

    private WebElement previousPageButton;
    private final String ID_PREVIOUS_PAGE_BUTTON = "previousPageButton";

    private WebElement nextPageButton;
    private final String ID_LAST_PAGE_BUTTON = "lastPageButton";

    private WebElement lastPageButton;
    private final String ID_NEXT_PAGE_BUTTON = "nextPageButton";

    private Select limitSelector;
    private final String ID_LIMIT_SELECTOR = "limitSelector";

    private WebElement pageInfo;
    private final String ID_PAGEINFO = "pageInfo";

    private WebElement table;
    private final String ID_TABLE = "full-width-table";

    private final String ID_SEARCH_FRUKT_TAB = "menu_searchfrukt";
    private final String ID_TEXTFIELD_SEARCH = "search";
    private final String ID_NAME_TOGGLE = "sort-by-name";
    private final String BASE_URL = "http://localhost:8080";

    @BeforeClass
    public static void setUp() {
        // start the proxy
        proxy = new BrowserMobProxyServer();
        proxy.start(0);

        // get the Selenium proxy object
        Proxy seleniumProxy = ClientUtil.createSeleniumProxy(proxy);

        // configure it as a desired capability
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(CapabilityType.PROXY, seleniumProxy);

        proxy.enableHarCaptureTypes(CaptureType.REQUEST_CONTENT, CaptureType.RESPONSE_CONTENT);

        proxy.addHeader("X-PERSONR", "19880301-1234");

        System.setProperty("webdriver.chrome.driver", ChromeTest.class.getResource("chromedriver").getFile());
        driver = new ChromeDriver(capabilities);
    }

    @Test
    public void searchAndSortFruktkorg() {

        driver.get(BASE_URL);

        waitAndGetElementById(ID_SEARCH_FRUKT_TAB).click();

        waitAndGetElementById(ID_TEXTFIELD_SEARCH).sendKeys("Päron" + Keys.ENTER);

        WebElement table = waitAndGetElementByClassName(ID_TABLE);
        waitForTextByXPath(FIRST_ROW_AND_FIRST_COLUMN, "Kafferummet 101");

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals(10, rows.size());

        waitAndGetElementById(ID_NAME_TOGGLE).click();
        waitForTextByXPath(FIRST_ROW_AND_FIRST_COLUMN, "96");

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

        Assert.assertFalse(isPresent(ID_TABLE));
        Assert.assertFalse(isPresent(ID_PAGINATION_CONTAINER));

        WebElement noItemsTextElement = waitAndGetElementByClassName("no-items");
        Assert.assertEquals("Inga fruktkorgar hittade.", noItemsTextElement.getText());
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

    private boolean isPresent(String id) {
        return driver.findElements(By.id(id)).size() > 0;
    }

    private void waitForTextByXPath(String path, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.textToBePresentInElement(By.xpath(path), text));
    }

    private boolean elementHasClass(String className, WebElement element) {
        return element.getAttribute("class").contains(className);
    }

    private void getAllPaginationElements() {

        this.firstPageButton = waitAndGetElementById(ID_FIRST_PAGE_BUTTON);
        this.previousPageButton = waitAndGetElementById(ID_PREVIOUS_PAGE_BUTTON);
        this.lastPageButton = waitAndGetElementById(ID_LAST_PAGE_BUTTON);
        this.nextPageButton = waitAndGetElementById(ID_NEXT_PAGE_BUTTON);
        this.limitSelector = new Select(waitAndGetElementById(ID_LIMIT_SELECTOR));
        pageInfo = waitAndGetElementById("pageInfo");
    }

}