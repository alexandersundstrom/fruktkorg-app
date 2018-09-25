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
    private WebElement firstPageButton;
    private WebElement previousPageButton;
    private WebElement nextPageButton;
    private WebElement lastPageButton;
    private Select limitSelector;
    private WebElement pageInfo;
    private WebElement table;

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

        driver.get("http://localhost:8080");

        waitAndGetElementById("menu_searchfrukt").click();

        waitAndGetElementById("search").sendKeys("Päron" + Keys.ENTER);


        WebElement table = waitAndGetElementByClassName("full-width-table");
        waitForTextByXPath(FIRST_ROW_AND_FIRST_COLUMN, "Kafferummet 101");

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals(10, rows.size());

        waitAndGetElementById("sort-by-name").click();
        waitForTextByXPath(FIRST_ROW_AND_FIRST_COLUMN, "96");

    }

    @Test
    public void searchAndChangeLimit() {
        driver.get("http://localhost:8080");

        waitAndGetElementById("menu_searchfrukt")
                .click();

        waitAndGetElementById("search")
                .sendKeys("Päron" + Keys.ENTER);

        getAllPaginationElements();

        Assert.assertTrue(elementHasClass( "disabled", firstPageButton));
        Assert.assertTrue(elementHasClass( "disabled", previousPageButton));
        Assert.assertFalse(elementHasClass("disabled", nextPageButton));
        Assert.assertFalse(elementHasClass( "disabled", lastPageButton));
        Assert.assertEquals("Default select value not correct", "10", limitSelector.getFirstSelectedOption().getText());
        Assert.assertEquals("Visar 1-10 av 100", pageInfo.getText());

        limitSelector.selectByValue("25");

        pageInfo = waitAndGetElementById("pageInfo");
        Assert.assertEquals("Visar 1-25 av 100", pageInfo.getText());

        table = waitAndGetElementByClassName("full-width-table");

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals(25, rows.size());
    }

    @AfterClass
    public static void cleanUp() {
        if (driver != null) {
            driver.close();
            driver.quit();
        }
    }

    public static WebElement waitAndGetElementById(String id) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id)));
        return driver.findElement(By.id(id));
    }

    public static WebElement waitAndGetElementByClassName(String className) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.ByClassName.className(className)));
        return driver.findElement(By.ByClassName.className(className));

    }

    public static void waitForTextByXPath(String path, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.textToBePresentInElement(By.xpath(path), text));
    }

    public static boolean elementHasClass(String className,WebElement element) {
        return element.getAttribute("class").contains(className);
    }

    public void getAllPaginationElements() {
        firstPageButton = waitAndGetElementById("firstPageButton");
        previousPageButton = waitAndGetElementById("previousPageButton");
        lastPageButton = waitAndGetElementById("lastPageButton");
        nextPageButton = waitAndGetElementById("nextPageButton");
        limitSelector = new Select(waitAndGetElementById("limitSelector"));
        pageInfo = waitAndGetElementById("pageInfo");
    }

}