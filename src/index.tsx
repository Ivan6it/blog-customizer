import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [finalSettings, setFinalSettings] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': finalSettings.fontFamilyOption.value,
					'--font-size': finalSettings.fontSizeOption.value,
					'--font-color': finalSettings.fontColor.value,
					'--container-width': finalSettings.contentWidth.value,
					'--bg-color': finalSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialSettings={finalSettings}
				onApply={(newSettings) => setFinalSettings(newSettings)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
