import React, { useState } from 'react';
import Input from '@mui/joy/Input';

interface StyledInputProps {
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: string) => void;
    icon?: React.ReactNode;
    inputStyles?: React.CSSProperties;
}

const RoundedInput: React.FC<StyledInputProps> = ({
                                                      value,
                                                      placeholder = 'Enter the word',
                                                      onChange,
                                                      onSubmit,
                                                      icon,
                                                      inputStyles,
                                                  }) => {
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                variant="soft"
                color={isActive ? 'primary' : 'neutral'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{
                    '--Input-radius': `20px`,
                    '&::before': {
                        top: 'unset',
                    },
                    ...inputStyles, // Здесь применяются дополнительные стили
                }}
                startDecorator={icon}
            />
        </form>
    );
};

export default RoundedInput;