# Open Game Frame

Chrome extension (Manifest V3) ที่กดไอคอนแล้วเปิด **iframe ที่ใหญ่ที่สุด** ของหน้าปัจจุบันในแท็บใหม่
เหมาะกับเกมที่ฝังอยู่ในหน้าเว็บ เช่น itch.io (HTML5) เพราะเปิดตรง ๆ แล้วเข้าถึง DevTools / localStorage ของเกมได้ง่าย

Click the toolbar icon to open the largest embedded iframe of the current page in its own tab.

## ติดตั้ง / Install

1. โหลด repo นี้ (`git clone` หรือ Download ZIP แล้วแตกไฟล์)
2. เปิด `chrome://extensions` แล้วเปิด **Developer mode**
3. กด **Load unpacked** แล้วเลือกโฟลเดอร์ของ repo
4. ปักไอคอนไว้ที่แถบเครื่องมือ

## วิธีใช้ / Usage

1. เปิดหน้าที่มีเกม แล้วกดให้เกมโหลดก่อน (เช่นปุ่ม **Run game** บน itch.io — iframe ถูกสร้างหลังกดปุ่ม)
2. กดไอคอน extension
3. แท็บใหม่จะเปิดเป็นหน้า iframe ตรง ๆ
4. ถ้าไม่พบ iframe จะขึ้นป้าย `!` สีแดงบนไอคอนประมาณ 2 วินาที

## ทำงานยังไง / How it works

- `chrome.scripting.executeScript` กับ `allFrames: true` รันในทุกเฟรม (รวมเฟรมซ้อนและข้ามโดเมน)
- แต่ละเฟรมรายงาน `location.href` จริงและขนาดหน้าต่าง
- เลือกเฟรมที่ไม่ใช่หน้าหลัก ขึ้นต้นด้วย `http(s)` และมีพื้นที่ใหญ่ที่สุด แล้วเปิดในแท็บถัดจากแท็บปัจจุบัน

## ข้อจำกัด / Limitations

- เลือกเฟรมเดียว (ใหญ่สุด) ไม่มีเมนูให้เลือก
- บางเว็บใช้ URL ที่มี token หมดอายุ หรือเช็ก referrer เปิดตรง ๆ แล้วอาจโหลดไม่ขึ้น
- ใช้ไม่ได้บนหน้า `chrome://` และ Chrome Web Store
- ขอสิทธิ์ `<all_urls>` เพราะต้องอ่าน URL ของ iframe ข้ามโดเมน — เหมาะกับใช้ส่วนตัวแบบ unpacked

## License

MIT
