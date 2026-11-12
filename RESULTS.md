# UI Lab Results

**Tool parts that I chose:** Part 3 – Robot Framework และ Part 4 – Cypress

## Part 0

- **Step 0.1, Chrome version:** Google Chrome 156.0.8078.80 (Windows 11, 64-bit)
- **Step 0.3, ChromeDriver version:** 156.0.8078.80
- **Step 0.4, locator of Pizza, Please!:** `button[name='pizza-please']`
- **Step 0.4, locator of Excluded tools:** `select`
- **Step 0.4, locator of Must be vegetarian:** `#default-checkbox`
- **Step 0.4, locator of Custom Pizza Name:** `input#pizza-name`
- **Step 0.5, pizza name, tool and calories of the run by hand:** Lab Pizza 20261106-190240, Pizza cutter, 425 calories per slice

| Step | Actual result | Pass or fail |
|---|---|---|
| 1 | เปิด QuickPizza และพบ Heading `Looking to break out of your pizza routine?` | PASS |
| 2 | เปิด Advanced แล้วแสดง Max Calories per Slice, Excluded tools, Must be vegetarian และ Custom Pizza Name | PASS |
| 3 | กรอก Max Calories = 600, Excluded tools = Knife, เลือก Vegetarian และกรอกชื่อพิซซ่า | PASS |
| 4 | ได้พิซซ่าชื่อที่กำหนด ใช้ Pizza cutter และมี 425 calories per slice ซึ่งไม่เกิน 600 | PASS |
| 5 | กด Love it! โดยไม่ได้ Login ระบบแสดง `Please log in first.` | PASS |
| 6 | Login ด้วย Admin สำเร็จ และพบ `Latest pizza recommendations` | PASS |
| 7 | พบพิซซ่าใน Admin list และ Tool ตรงกับหน้า Recommendation คือ Pizza cutter | PASS |

**Overall result:** PASS (7/7 steps)

## Part 3: Robot Framework

- **robot --version:** Robot Framework 7.5.1 (Python 3.13.14 on win32)
- **Step 3.2, failure message for the wrong title:** Not recorded. The exact failure message from the intentional wrong-title test was not saved.
- **Step 3.8, run 1, result, elapsed time and pizza name:** PASS (1 passed, 0 failed), 9.515 seconds, `Lab Pizza 20261106-193751`
- **Step 3.8, run 2, result, elapsed time and pizza name:** PASS (1 passed, 0 failed), 9.940 seconds, `Lab Pizza 20261106-193809`

**Evidence:**
- `robot/results/run1/`
- `robot/results/run2/`

ทั้งสองรอบผ่านการทดสอบ QP-01 และตรวจสอบว่าพิซซ่าปรากฏใน Admin list โดยมี Tool เป็น Pizza cutter ตรงกับหน้า Recommendation

## Part 4: Cypress

- **node --version:** v24.11.0
- **npm --version:** 11.12.1
- **npx cypress version:** 16.2.1
- **Browser:** Google Chrome 156 (Headless)
- **Step 4.3, failure message for the wrong title:** Not recorded. The exact failure message from the intentional wrong-title test was not saved.
- **Step 4.6, tool and calories in the answer of POST /api/pizza:** The API request returned HTTP 200 OK during the successful test. The exact Tool and Calories values from that response were not recorded.
- **Step 4.7, the line of the admin list that shows your pizza:** `Lab Pizza 1793971676670 (tool=Pizza cutter, ingredients_number=7)`
- **Step 4.8, run 1, result, duration and pizza name:** PASS (2 passed, 0 failed), 15 seconds. Pizza Name: Not recorded in the saved run output.
- **Step 4.8, run 2, result, duration and pizza name:** PASS (2 passed, 0 failed), 14 seconds. Pizza Name: Not recorded in the saved run output.
- **Step 4.9 (optional), browser and result:** Not performed.

**Evidence:**
- `cypress/cypress/screenshots/`
- `cypress/cypress/videos/pizza-scenario.cy.js.mp4`
- `cypress/cypress/videos/web-form.cy.js.mp4`

Cypress ผ่านทั้ง Pizza Scenario และ Web Form ในการทดสอบทั้งสองรอบ โดยมี Screenshots 6 ภาพ และ Videos 2 ไฟล์จากรอบที่บันทึกหลักฐานล่าสุด ภาพ Admin list แสดง `Lab Pizza 1793971676670` แต่ไม่สามารถยืนยันได้ว่าเป็น Run 1 หรือ Run 2

## Part B: Reflection

### 1. Why do the tests locate Max Calories per Slice through its label instead of its id?

ช่อง Max Calories per Slice ใช้ ID `floating_filled` ซึ่งซ้ำกับ Input อื่นบนหน้า QuickPizza จึงไม่สามารถใช้ ID นี้เพื่อระบุช่องที่ต้องการได้อย่างชัดเจน Test จึงใช้ Label `Max Calories per Slice` เพื่อค้นหา Input ที่เกี่ยวข้อง หากปรับหน้าเว็บให้ช่องนี้มี ID เฉพาะ เช่น `max-calories` และเชื่อม Label ด้วย `for="max-calories"` จะสามารถใช้ Locator `#max-calories` ได้โดยตรง วิธีนี้ทำให้ Locator สั้นลงและลดโอกาสที่ Test จะเลือกผิดช่อง

### 2. What kind of test oracle is used in Step 7 of QP-01?

Step 7 ใช้ **Consistency-based Test Oracle** โดยนำค่า Tool จากหน้า Recommendation มาเปรียบเทียบกับ Tool ที่แสดงใน Admin list ข้อมูลทั้งสองจุดควรตรงกันเพราะเป็นพิซซ่ารายการเดียวกัน การตรวจสอบนี้ช่วยจับข้อผิดพลาดกรณีที่ระบบแสดง Tool อย่างหนึ่ง แต่บันทึกหรือแสดงใน Admin list เป็นอีกอย่างหนึ่ง จากการทดสอบ Robot Framework ทั้งสองรอบ ระบบแสดง Pizza cutter ตรงกันและ Test ผ่าน

### 3. How could QP-01 verify that the pizza is vegetarian?

ควรเพิ่มการตรวจสอบ Ingredients ของพิซซ่าที่ระบบสร้างขึ้น เพราะการเลือก Checkbox อย่างเดียวไม่สามารถยืนยันได้ว่าพิซซ่าเป็น Vegetarian จริง Test ควรอ่าน Ingredients จากหน้าเว็บหรือ API Response แล้วนำมาตรวจสอบว่ามีส่วนผสมที่ไม่ใช่ Vegetarian หรือไม่ การตรวจสอบนี้ต้องมีข้อมูลรายการ Ingredients และแหล่งอ้างอิงที่ระบุว่าส่วนผสมใดเป็น Vegetarian หรือ Non-vegetarian จึงจะสามารถยืนยันผลได้อย่างถูกต้อง

### 4. Compare Robot Framework and Cypress.

Robot Framework ใช้ Keywords และ Explicit Waits เพื่อรอ Elements ที่ต้องการบนหน้า QuickPizza ส่วน Cypress มี Automatic Retry สำหรับ Commands และ Assertions ทำให้รอ Elements ได้สะดวก Robot Framework มี Test Steps ที่อ่านง่ายและ HTML Reports พร้อม Execution Logs ที่ละเอียด ขณะที่ Cypress เขียนด้วย JavaScript และใช้ `cy.intercept()` เพื่อตรวจสอบ API ได้โดยตรง ใน Lab นี้ Robot Framework Run 1 ใช้เวลา 9.515 วินาที ส่วน Cypress Full Runs ใช้เวลา 15 และ 14 วินาทีสำหรับ 2 Tests และมี Screenshots กับ Videos สำหรับตรวจสอบย้อนหลัง การเขียน QP-01 ด้วย Robot Framework ช่วยให้อ่านขั้นตอนง่าย ส่วน Cypress สะดวกเมื่อต้องตรวจสอบ UI และ API ร่วมกัน

### 5. Which tool would you choose for Project 2?

ผมเลือก **Cypress** สำหรับ Automated UI Testing ของ Project 2 เพราะมี Automatic Retry ช่วยลดปัญหาจาก Elements ที่โหลดไม่ทัน อีกเหตุผลคือ Cypress สามารถตรวจสอบ UI และ API Response ได้ภายใน Test เดียวกัน จาก Lab นี้ Cypress ทดสอบ Pizza Scenario และ Web Form ผ่านทั้งสองรอบ นอกจากนี้ยังสร้าง Screenshots และ Videos เพื่อใช้เป็นหลักฐานและช่วยตรวจสอบข้อผิดพลาดได้

### 6. Part 3: How does the Resource File help when a locator changes?

หาก QuickPizza เปลี่ยน Locator ของช่อง Max Calories per Slice จะต้องแก้ Locator หรือ Keyword ที่เกี่ยวข้องใน `robot/resources/quickpizza.resource` โดยไม่จำเป็นต้องแก้ทุกขั้นตอนใน `pizza_scenario.robot` เพราะ Test File เรียกใช้ Keywords ที่กำหนดไว้ใน Resource File การแยก Locators และ Keywords ออกจาก Test File ทำให้แก้ไขจากจุดเดียวได้ง่ายขึ้น และช่วยลดการแก้โค้ดซ้ำเมื่อหน้าเว็บเปลี่ยน

### 7. Part 4: Why must QP-01 remain a single Cypress test?

QP-01 ต้องทำทั้ง 7 Steps ภายใน Cypress Test เดียว เพราะ Cypress แยก Browser State และล้าง Cookies ระหว่าง Tests QuickPizza ใช้ Cookie เพื่อให้ Browser เชื่อมต่อกับ Server ที่สร้างพิซซ่ารายการนั้น หากแยก Steps 6–7 เป็นอีก Test อาจทำให้ Cookie เดิมหายไปและเชื่อมต่อกับ Server คนละตัว ส่งผลให้ Admin list ไม่พบพิซซ่าที่สร้างไว้ แม้ว่าระบบจะทำงานถูกต้องก็ตาม