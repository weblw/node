# `Element-UI`

## Layout布局

- layout-row
  - gutter：格栅间隔number
  - type：可以为flex
  - justify：flex布局下的水平排列方式
  - align：flex布局下的垂直排列方式
  - tag：自定义元素标签
- layout-col
  - offset：格栅左侧间隔数
  - push：格栅向右移动格数
  - pull：格栅向左移动格数

## Checkbox多选框

- true-label：选中时的值
- false-label：没有选中时的值
- indeterminate：半选时的样式

## Input输入框

- prefix-icon：输入框头部图标
- suffix-icon：输入框尾部图标
- clearable：是否可清空
- show-word-limit：是否显示字数统计
- autocomplete：自动补全
- readonly：是否只读（form表单配合input的readonly，既有form表单样式，又不允许用户编辑）
- autofocus：自动获取焦点
- input-slots：prefix输入框头部、suffix输入框尾部、prepend输入框前置内容、append输入框后置内容
- autocomplete attributes：debounce获取输入时的建议去抖延时

## Select选择器

- multiple：是否多选
- clearable：是否可清空
- multiple-limit：多选时用户最多可选择的项目数
- filterable：是否可搜索
- allow-create：是否允许用户创建条目，需要配合filterable使用
- remote：是否为远程搜索
- remote-method：远程搜索方法
- loading：是否正在从远程获取数据
- loading-text：远程加载时显示的文字
- no-match-text：搜索条件无匹配时显示的文字
- no-data-text：无数据时现实的文字
- popper-class：select下拉框的类名
- reserve-keyword：多选且可搜索时，是否在选中一个选项后保留当前搜索的关键词
- default-first-position：在输入框按下回车，是否选择第一个匹配项

## Cascader级联选择器

- show-all-levels：输入框是否显示选中值得完整路径
- collapse-tags：多选模式下是否折叠tag
- separator：选项分隔符
- filterable：是否可搜索选项
- filter-method：自定义搜索逻辑
- debounce：搜索关键词输入时的去抖延时
- before-filter：筛选之前的钩子
- popper-class：自定义浮层类名

## Switch开关

- active-icon-class：打开时显示的图标类名
- inactive-icon-class：关闭时显示的图标类名
- active-text：打开时显示的文字
- inactive-text：关闭时显示的文字
- validate-event：改变swItch状态时，是否触发表单校验

## Upload上传

- on-exceed：文件超出个数限制时的钩子
- with-credentials：是否允许请求时带上cookies
- headers：请求头 {crossDomain:true}允许跨域请求时带上cookie
- http-request：覆盖默认的上传行为，可自定义上传实现

## Form表单

- label-position：表单域标签位置
- label-suffix：表单域标签的后缀
- hide-required-asterisk：是否显示必填字段旁的红色星号
- inline-message：是否以行内形式展示校验信息
- status-icon：是否在输入框显示校验结果反馈图标
- validate-on-rule-change：是否在rule属性发生变化后立即触发一次校验

## Table表格

- fit：列宽度是否自动撑开

- show-header：是否显示表头

- highlight-current-row：是否高亮当前行

- row-class-name：接收字符串或者回调函数，指定表格行样式

- row-style：行的style

- cell-class-name：单元格className

- cell-style：单元格style

- header-row-class-name：表头行className

- header-cell-class-name：表头单元格className

- row-key：行数据的key，用来优化table渲染

- show-overflow-tooltip：内容过长时隐藏显示tooltip

- align：left、center、right指定单元格文字位置

- empty-text：空数据时显示的内容
- span-method：合并行或列的计算方法
- table-column
  - type：列对应的类型，selection显示多选框、index显示索引（从1开始）、expand显示可展开按钮
  - class-name：列的className
  - label-class-name：当前列标题的自定义类名
  - sortable：实现以该列为基准的排序
  - default-sort：设置默认排序和默认排序顺序
  - sort-method或者sort-by：自定义排序规则

## Pagination分页

- current-page.sync：可以实现在通过jumper属性跳转的时候，父组件能够获取el-pagination的状态变化
- layout：sizes、prev、pager、next、jumper、total、—>
- prev-text：代替上一页的文字
- next-text：代替下一页的文字
- hide-on-single-page：只有一页时是否隐藏分页器

## Breadcrumb面包屑

- separator：分隔符
- separator-class：图标分隔符的class

## Dialog对话框

- modal：是否需要遮罩层
- lock-scroll：在弹窗出现时是否将body滚动锁定
- close-on-click-modal：是否可以通过点击弹窗的遮罩层关闭弹窗
- close-on-press-escape：是否可以通过ESC关闭dialog
- custom-class：dialog的自定义类名
- center：是否对弹窗头部底部采取居中布局
- destroy-on-close：关闭弹窗时是否销毁Dialog中元素
