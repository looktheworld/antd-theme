/**
 * @file components/BaseHooksList/Pagination Acud分页组件
 * @author yangxingqiang
 */

import React, {FC, useCallback} from 'react';
import {Pagination} from 'acud';
import classnames from 'classnames';

import './index.less';

export interface BasePaginationProps {
    total?: number;
    defaultCurrent?: number;
    disabled?: boolean;
    current?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize?: number) => void;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, size: number) => void;
    showQuickJumper?: boolean | {
        goButton?: React.ReactNode;
    };
    showTitle?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    size?: 'default' | 'small';
    responsive?: boolean;
    simple?: boolean;
    style?: React.CSSProperties;
    locale?: Object;
    className?: string;
    prefixCls?: string;
    selectPrefixCls?: string;
    itemRender?: (
        page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'
        , originalElement: React.ReactElement<HTMLElement>
    ) => React.ReactNode;
    role?: string;
    showLessItems?: boolean;
}

const BasePagination: FC<BasePaginationProps> = props => {
    const {
        onChange,
        onShowSizeChange,
        pageSize: defaultPageSize,
        pageSizeOptions,
        showSizeChanger = true,
        showQuickJumper = true
    } = props;

    // 自定义类名
    const contentClass = classnames('base-hooks-list-page');

    // 总数据条数
    const showTotal = useCallback(total => {
        return `共 ${total} 条`;
    }, []);

    return (
        <div className={contentClass}>
            {props.children}
            <Pagination
                {...props}
                showTotal={showTotal}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={showSizeChanger}
                showQuickJumper={showQuickJumper}
                defaultPageSize={defaultPageSize}
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
            />
        </div>
    );
};

export default BasePagination;
