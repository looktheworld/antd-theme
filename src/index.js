// 导出less主题变量
export default {
    hack_less: `true;@import "${require.resolve('./styles/theme.less')}";`,
}

// 导出公用组件
export {default as BaseHooksList} from './components/BaseHooksList';
export {default as BaseLayout} from './components/BaseLayout';
export {default as PageTitle} from './components/PageTitle';