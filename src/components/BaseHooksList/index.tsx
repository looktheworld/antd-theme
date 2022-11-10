/**
 * @file components/BaseHooksList 自定义封装HooksList组件
 * @description 说明文档：https://ku.baidu-int.com/knowledge/HFVrC7hq1Q/pKzJfZczuc/FOcR8RNWEd/1pEQI0RGwp4sjo#anchor-b8c3bfa0-479c-11ed-80e6-9be68c9bc134
 * @author yangxingqiang
 */

import _ from 'lodash';
import React, {useMemo, useState} from 'react';
import classnames from 'classnames';
import {components} from 'baidu-acu-react-common';

import BasePagination, {BasePaginationProps} from './Pagination';
import Empty, {TableEmptyProps} from './Empty';

import './index.less';

const {HooksList} = components;

// 空状态的两种类型
type localeProps = 'defaultEmpty' | 'filterEmpty';

interface BaseHooksListProps {
    paginationProps?: BasePaginationProps; // 分页组件的参数
    className?: string; // 类名
    tableProps?: any;
    filterProps?: any;
    emptyConfig?: {
        filterData?: any; // 判断值是否为空，为空则为初始模式（defaultEmpty），反之则展示过滤模式（filterEmpty）
        modeConfig?: Record<localeProps, TableEmptyProps>
    };
}

export default (props: BaseHooksListProps) => {
    // 获取分页参数和类名等
    const {
        paginationProps,
        className = '',
        tableProps = {},
        filterProps,
        emptyConfig = {filterData: {}}
    } = props;
    // 新增类名控制样式
    const baseListClass = classnames(className, 'base-hooks-list');
    // 列表没有数据时隐藏分页区域
    const showPagination = !!_.get(paginationProps, 'total');
    // 是否使用useList内置的search
    const isHooksListSearch = _.some(_.get(filterProps, 'filterConfig.controls') || [], {type: 'search'});
    const [searchInfo, setSearchInfo] = useState({});
    if (isHooksListSearch) {
        emptyConfig.filterData = {...emptyConfig?.filterData, ...searchInfo};
        const {onHandleFilter} = filterProps;
        props.filterProps.onHandleFilter = (args: any) => {
            onHandleFilter(args);
            setSearchInfo(args); // 设置请求后端数据时的search
        };
    }
    // 缓存动态计算空状态的JSX
    const EmptyJSX = useMemo(() => {
        let emptyJSX = (<Empty text="暂无结果" />);
        // 判断当前是否有过滤值(search查询和分类查询)
        const filterData = _.get(emptyConfig, 'filterData') || {};
        let hasFilterData = false;
        if (typeof filterData !== 'object') {
            hasFilterData = !!filterData;
        }
        else {
            hasFilterData = !_.isEmpty(_.filter(_.values(filterData || {}), item => !_.isEmpty(item)));
        }

        // 配置两种空数据样式
        const modeConfig = _.get(emptyConfig, 'modeConfig') || ({} as any);
        if (modeConfig) {
            const {defaultEmpty, filterEmpty} = modeConfig;
            // 没有过滤条件时，结果为空值
            if (!hasFilterData && defaultEmpty) {
                emptyJSX = (<Empty {...defaultEmpty} />);
            }
            // 有过滤值时查询结果为空
            else if (hasFilterData && filterEmpty) {
                emptyJSX = (<Empty {...filterEmpty} />);
            }
        }
        return emptyJSX;
    }, [emptyConfig]);

    // 处理表格空数据
    const formatTableProps = useMemo(() => {
        let formatTableProps = tableProps;
        formatTableProps.locale.emptyText = EmptyJSX;
        return formatTableProps;
    }, [tableProps, EmptyJSX]);

    return (
        <div className="base-hooks-list-wrap">
            <HooksList
                {...props}
                paginationProps={false}
                className={baseListClass}
                tableProps={formatTableProps}
            />
            {showPagination && (
                <BasePagination {...paginationProps} />
            )}
        </div>
    );
};