import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 발신자 Gmail 주소
    pass: process.env.EMAIL_PASS, // Gmail 앱 비밀번호
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // 입력값 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 내용 구성
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // 수신자 이메일 (본인 이메일)
      subject: `[ezySalad 문의] ${name}님의 문의사항`,
      html: `
        <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4AE54A 0%, #22C55E 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">새로운 문의가 접수되었습니다</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="margin-bottom: 25px;">
              <h3 style="color: #374151; margin-bottom: 10px; font-size: 16px;">고객 정보</h3>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                <p style="margin: 5px 0; color: #4b5563;"><strong>이름:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>이메일:</strong> ${email}</p>
                ${
                  phone
                    ? `<p style="margin: 5px 0; color: #4b5563;"><strong>연락처:</strong> ${phone}</p>`
                    : ""
                }
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #374151; margin-bottom: 10px; font-size: 16px;">문의 내용</h3>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                접수 시간: ${new Date().toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      // 텍스트 버전 (HTML을 지원하지 않는 클라이언트용)
      text: `
        새로운 문의가 접수되었습니다.
        
        고객 정보:
        - 이름: ${name}
        - 이메일: ${email}
        ${phone ? `- 연락처: ${phone}` : ""}
        
        문의 내용:
        ${message}
        
        접수 시간: ${new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        })}
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    // 자동 응답 이메일 전송 (선택사항)
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "[ezySalad] 문의가 접수되었습니다",
      html: `
        <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4AE54A 0%, #22C55E 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">문의가 접수되었습니다</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; margin-bottom: 20px;">안녕하세요, ${name}님!</p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              ezySalad에 문의해 주셔서 감사합니다.<br>
              고객님의 문의사항을 확인했으며, 빠른 시일 내에 답변드리겠습니다.
            </p>
            
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0; font-size: 14px;">접수된 문의 내용:</h3>
              <p style="color: #6b7280; margin: 10px 0; font-size: 14px; line-height: 1.6;">${message}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              영업일 기준 1-2일 이내에 답변드릴 예정이니 조금만 기다려주세요.<br>
              추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">📞 02-1234-5678</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">📧 info@easysalad.com</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">⏰ 월-금: 06:30 - 20:30</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "문의가 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("이메일 전송 오류:", error);
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
