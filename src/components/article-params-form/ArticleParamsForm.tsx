import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] = useState(initialSettings);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const handleReset = () => {
		setSettings(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(settings);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={settings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setSettings((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(option) =>
							setSettings((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={settings.fontColor}
						options={fontColors}
						onChange={(color) =>
							setSettings((prev) => ({ ...prev, fontColor: color }))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={settings.backgroundColor}
						options={backgroundColors}
						onChange={(bg) =>
							setSettings((prev) => ({ ...prev, backgroundColor: bg }))
						}
					/>
					<Select
						title='Ширина контента'
						selected={settings.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setSettings((prev) => ({ ...prev, contentWidth: option }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleReset}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
