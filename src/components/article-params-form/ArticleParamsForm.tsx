import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
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
	onApply: (draftSettings: ArticleStateType) => void;
};

type SettingValue = OptionType | string | number;

export const ArticleParamsForm = ({
	initialSettings,
	onApply,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [draftSettings, setDraftSettings] = useState(initialSettings);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	const handleReset = () => {
		setDraftSettings(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draftSettings);
	};

	const handleChange =
		(field: keyof ArticleStateType) => (value: SettingValue) => {
			setDraftSettings((prev) => ({
				...prev,
				[field]: value,
			}));
		};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		if (!isSidebarOpen) return;

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={formRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={draftSettings.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={draftSettings.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftSettings.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={draftSettings.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
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
