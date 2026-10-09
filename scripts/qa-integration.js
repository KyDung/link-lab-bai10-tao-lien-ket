async (page) => {
 const report={};
 await page.reload();
 await page.locator('#preview-links').getByRole('button',{name:'Mở dự án'}).click();
 report.virtualDestination=await page.locator('#virtual-browser iframe').contentFrame().getByRole('heading',{name:'Sản phẩm đầu tay'}).innerText();
 await page.getByRole('button',{name:'Đóng trang mô phỏng'}).click();
 await page.setViewportSize({width:390,height:844});
 await page.locator('#preview').contentFrame().getByRole('heading',{name:'CV kiểm thử'}).waitFor();
 await page.screenshot({path:'output/playwright/mobile-final.png',fullPage:true});
 await page.setViewportSize({width:1440,height:960});
 await page.getByRole('button',{name:'Nộp bài vận dụng →'}).click();
 await page.waitForFunction(()=>/Đã gửi|Không thể gửi/.test(document.querySelector('#submit-status').textContent),{timeout:30000});
 report.firebase=await page.locator('#submit-status').innerText();
 report.localDraftRetained=await page.evaluate(()=>!!JSON.parse(localStorage.getItem(Store.key)).final.code);
 await page.goto('http://127.0.0.1:8081/teacher.html');
 await page.getByRole('textbox',{name:'Email',exact:true}).waitFor();
 report.teacherLoginForm=await page.getByRole('button',{name:'Đăng nhập',exact:true}).count()===1;
 await page.screenshot({path:'output/playwright/teacher.png',fullPage:true});
 return report;
}
