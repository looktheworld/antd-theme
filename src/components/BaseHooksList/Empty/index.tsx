/**
 * @file components/BaseHooksList/Empty
 * @description
 *  img: {
        style, // 图片style设置
        custom // 自定义
    }: 图片自定义，可选。不传时默认图片
 *  text: 主要描述文字
 *  description: 次要引导描述文字
 *  className: Empty 组件classname
 *  custom: 自定义实现
 *  style: 外层 style 设置
 * @author chenyaqiu
 */
import React, {CSSProperties, ReactNode} from 'react';

import './index.less';

export interface TableEmptyProps {
    text?: ReactNode;
    description?: ReactNode;
    className?: string;
    style?: CSSProperties;
    img?: {
        custom?: ReactNode;
        style?: CSSProperties
    }
    custom?: ReactNode;
}

export default (props: TableEmptyProps) => {
    const {
        text,
        description,
        className = '',
        style = {},
        img: {
            custom: imgCustom = null,
            style: imgStyle = undefined
        } = {},
        custom
    } = props || {};

    return (
        <div className={`base-custom-list-empty ${className}`} style={style}>
            <div className={`empty-img ${!imgCustom ? 'default-empty-img' : ''}`} style={imgStyle}>
                {imgCustom}
            </div>
            {text && <div className="empty-text">
                {text}
            </div>}
            {description && <div className="empty-description">
                {description}
            </div>}
            {custom && <div>{custom}</div>}
        </div>
    );
};
