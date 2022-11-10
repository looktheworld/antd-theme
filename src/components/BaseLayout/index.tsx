/**
 * @file components/BaseLayout Layout组件
 * @author yangxingqiang
 */

import React, {FC} from 'react';
import classnames from 'classnames';

import PageTitle, {PageTitleProps} from '../PageTitle';

import './index.less';


type BaseLayoutProps = PageTitleProps & {
    showPageTitle?: boolean; // 是否显示header部分
    mode?: 'card' | 'tabs' | 'tabs-card'; // 如果是card，每个card或section为单独的模块，加边框圆角和白色背景
}

const BaseLayout: FC<BaseLayoutProps> = props => {

    const {showPageTitle = true, mode = '', className, ...pageTitleProps} = props;

    // 2. 自定义类名
    const prefixClass = classnames('base-layout-wrap', className);
    const contentClass = classnames('base-layout-content', {
        'base-layout-card-wrap': mode === 'card',
        'base-layout-tabs-wrap': mode === 'tabs',
        'base-layout-card-wrap base-layout-tabs-wrap': mode === 'tabs-card'
    });

    return (
        <div className={prefixClass}>
            {showPageTitle && <PageTitle
                className="base-layout-header"
                {...pageTitleProps}
            />}
            <div className={contentClass}>
                {props.children}
            </div>
        </div>
    );
};

export default BaseLayout;
