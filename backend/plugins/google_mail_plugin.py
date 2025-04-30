import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from pathlib import Path
from email.mime.multipart import MIMEMultipart
from semantic_kernel.functions import kernel_function
import os
from dotenv import load_dotenv

class MailPlugin:
    def __init__(self):
        load_dotenv()
        self.app_pwd = os.getenv("GOOGLE_APP_ID")
        self.planner_mail = os.getenv("GOOGLE_PLANNER_MAIL")
    
    @kernel_function(
        description="Sends an email contain travel detail image using a Gmail account.",
        name="SendEmailWithGmail",
    )
    def send_email_with_gmail(self, user_mail: str, subject: str, message: str, file_name: str) -> bool:
        """
        使用Gmail帳號發送包含內嵌圖片的電子郵件

        參數:
        user_mail (str): 收件人電子郵件
        subject (str): 郵件主題
        message (str): 純文字郵件內容 (如果沒有HTML內容)
        image_paths (list, 可選): 圖片檔案路徑的列表，用於內嵌到郵件中。預設為None。

        返回:
        bool: 發送成功返回True，失敗返回False
        """
        print(f"發送郵件到: {user_mail},{file_name}")
        image_paths = [f"uploads/{file_name}"]  # 圖片檔案路徑列表
        try:
            # 創建郵件
            msg = MIMEMultipart('related')  # 改用 'related' 以便內嵌圖片
            msg['From'] = self.planner_mail
            msg['To'] = user_mail
            msg['Subject'] = subject

            # 添加郵件的HTML內容
            html = f"""\
            <html>
            <body>
                <p>{message}</p><br>
            """
            if image_paths:
                for i, img_path in enumerate(image_paths):
                    cid = f"image{i+1}"  # 每個圖片都需要一個唯一的 Content-ID
                    html += f"""\
                <img src="cid:{cid}">
                    """
            html += """\
            </body>
            </html>
            """

            msg.attach(MIMEText(html, 'html'))

            # 添加圖片附件
            if image_paths:
                for i, img_path_str in enumerate(image_paths):
                    img_path = Path(img_path_str)
                    if img_path.is_file():
                        with open(img_path, 'rb') as img_file:
                            img = MIMEImage(img_file.read())
                            img.add_header('Content-ID', f'<image{i+1}>')  # Content-ID 需要用尖括號包圍
                            msg.attach(img)
                    else:
                        print(f"警告: 圖片檔案不存在: {img_path}")

            # 連接到Gmail SMTP服務器
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                # 登入Gmail帳號
                server.login(self.planner_mail, self.app_pwd)

                # 發送郵件
                server.sendmail(self.planner_mail, user_mail, msg.as_string())
                print("郵件發送成功！")
                return True

        except Exception as e:
            print(f"發送郵件時出錯: {e}")
            return False

