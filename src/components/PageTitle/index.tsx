/**
 * @file components/PageTitle 一级标题组件
 * @author yangxingqiang
 */

import _ from 'lodash';
import React, {FC, ReactNode, useCallback} from 'react';
import {Button, Tooltip} from 'acud';
import {OutlinedLeft} from 'acud-icon';
import {Link, generatePath, useHistory} from 'react-router-dom';
import classnames from 'classnames';

import './index.less';

interface PageTitleBtnProps {
    disabled?: boolean; // 不可点击
    text?: ReactNode; // 按钮文本
    tooltip?: any; // hover提示
    className?: string; // 类名
}
export interface PageTitleProps {
    title?: ReactNode; // 标题
    backText?: string; // 返回的文本
    backUrl?: string | object & {pathname: string}; // 返回的url
    defaultBackUrl?: string;
    backParams?: any; // 返回的参数
    className?: string; // class名称
    custom?: ReactNode; // 自定义title位置的文本
    extra?: ReactNode; // title右侧扩展信息
    btnConfig?: PageTitleBtnProps[] // 按钮配置
    description?: ReactNode; // 换行的描述信息
}

const PageTitle: FC<PageTitleProps> = props => {
    const {
        defaultBackUrl,
        backUrl,
        backParams,
        backText = '返回',
        title,
        btnConfig,
        custom,
        className,
        extra,
        description
    } = props;

    const history = useHistory();

    let backLink;
    if (_.isString(backUrl)) {
        backLink = backParams ? generatePath(backUrl, backParams) : backUrl;
    }
    else if (backUrl) {
        let pathname = _.get(backUrl, 'pathname');
        backLink = {
            ...(backUrl || {}),
            pathname: backParams ? generatePath(pathname, backParams) : pathname
        };
    }

    const handlAction = useCallback((btnItem = {}) => {
        const {btnAction} = btnItem;
        btnAction && btnAction();
    }, []);

    // 2. 自定义类名
    const prefixClass = classnames('base-page-title-wrap', className);

    // 3. 处理返回
    const handleBack = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('goBack') === 'default' && defaultBackUrl) {
            history.push(defaultBackUrl);
        } else {
            history.goBack();
        }
    }, [defaultBackUrl, history]);

    return (
        <div className={prefixClass}>
            <div className="base-page-title">
                {/* 优先使用backUrl跳转，其次是defaultBackUrl，最后是浏览器返回上一页 */}
                {backUrl ? (
                    <div className="back-btn">
                        <Link to={backLink as any}>
                            <OutlinedLeft />
                            <span className="back-text">{backText}</span>
                        </Link>
                    </div>
                ) : defaultBackUrl ? (
                    <div className="back-btn" onClick={handleBack}>
                        <a>
                            <OutlinedLeft />
                            <span className="back-text">{backText}</span>
                        </a>
                    </div>
                ) : null}
                {title && (
                    <div className={`base-page-title-text ${!(backUrl || defaultBackUrl) && 'noBack'}`}>{title}</div>
                )}
                {custom && (
                    <div className="base-page-title-custom">{custom}</div>
                )}
                {btnConfig && (
                    <div className="base-page-title-btns-area">
                        {_.map(btnConfig, btnItem => {
                            const {disabled, text, tooltip, className, ...otherProps} = btnItem;
                            const classNames = classnames('base-page-title-btns-item', className);
                            const btnComp = (
                                <Button
                                    {...otherProps}
                                    className={classNames}
                                    disabled={!!disabled}
                                    onClick={() => handlAction(btnItem)}
                                >{text}</Button>
                            );
                            return tooltip ? (
                                <Tooltip {...tooltip}>
                                    {btnComp}
                                </Tooltip>
                            ) : btnComp;
                        })}
                    </div>
                )}
                {extra && <div className="base-page-title-extra-area">{extra}</div>}
            </div>
            {description && <div className="base-page-title-description">{description}</div>}
        </div>
    );
};

export default PageTitle;
