import React, {useState, useEffect} from 'react';
import Button from "@mui/joy/Button";

interface EmailSenderProps {
    sendEmail: () => Promise<void>;
    timeout?: number;
    props?: any;
}

const EmailSender: React.FC<EmailSenderProps> = ({sendEmail, timeout = 60, ...props}) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(timeout);
    
    const handleClick = async () => {
        try {
            setIsButtonDisabled(true);
            
            // Отправляем email
            await sendEmail();
            startCountdown();
        } catch (error) {
            console.error('Ошибка при отправке email:', error);
            // Разблокируем кнопку в случае ошибки
            setIsButtonDisabled(false);
        }
    };
    
    const startCountdown = () => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        
        // Устанавливаем таймер для разблокировки кнопки через 1 минуту
        setTimeout(() => {
            clearInterval(countdownInterval);
            setIsButtonDisabled(false);
            setCountdown(timeout);
        }, timeout * 1000);
    };
    
    useEffect(() => {
        // Очищаем интервал и сбрасываем состояние при размонтировании компонента
        return () => {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            setCountdown(timeout);
        };
    }, []);
    
    return (
        <Button {...props} onClick={handleClick} disabled={isButtonDisabled}>
            {isButtonDisabled ? `Send again after ${countdown} s` : 'Resend Email'}
        </Button>
    );
};

export default EmailSender;
