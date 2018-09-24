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
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;


public class ChromeTest {

    private static WebDriver driver;
    private static BrowserMobProxy proxy;

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

        System.setProperty("webdriver.chrome.driver", ChromeTest.class.getResource("chromedriver").getFile());
        driver = new ChromeDriver(capabilities);
    }

    @Test
    public void searchAndSortFruktkorg() {
        proxy.addHeader("X-PERSONR", "19880301-1234");
        driver.get("http://localhost:8080");

        waitForElementById("menu_searchfrukt");
        driver.findElement(By.id("menu_searchfrukt")).click();

        waitForElementById("search");
        driver.findElement(By.id("search")).sendKeys("Päron" + Keys.ENTER);

        waitForElementById("fruktSearchTable");

        WebElement table = driver.findElement(By.ByClassName.className("full-width-table"));
        Assert.assertNotNull("Could not find table", table);

        String firstRowAndFirstColumn = "//tr[1]/td[1]";
        waitForTextByXPath(firstRowAndFirstColumn, "Kafferummet 101");

        List rows = table.findElements(By.tagName("tr"));
        Assert.assertEquals("Should be 10 Fruktkorgar displayed", 10, rows.size());

        driver.findElement(By.id("sort-by-name")).click();
        waitForTextByXPath(firstRowAndFirstColumn, "96");

    }

    @AfterClass
    public static void cleanUp() {
        if (driver != null) {
            driver.close();
            driver.quit();
        }
    }

    public static void waitForElementById(String id) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("menu_searchfrukt")));
    }

    public static void waitForTextByXPath(String path, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.textToBePresentInElement(By.xpath(path), text));
    }


}