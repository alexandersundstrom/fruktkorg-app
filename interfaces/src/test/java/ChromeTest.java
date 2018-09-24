import net.lightbody.bmp.BrowserMobProxy;
import net.lightbody.bmp.BrowserMobProxyServer;
import net.lightbody.bmp.client.ClientUtil;
import net.lightbody.bmp.proxy.CaptureType;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


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
    public void searchForFruktkorg() {
        proxy.addHeader("X-PERSONR", "19880301-1234");
        driver.get("http://localhost:8080");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("menu_searchfrukt")));

        driver.findElement(By.id("menu_searchfrukt")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("search")));
        driver.findElement(By.id("search")).sendKeys("Päron" + Keys.ENTER);
        System.out.println("Done");
    }

    @AfterClass
    public static void cleanUp() {
        if (driver != null) {
            driver.close();
            driver.quit();
        }
    }

}