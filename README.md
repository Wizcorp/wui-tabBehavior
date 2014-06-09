# wuiTabBehavior

## What it is

wuiTabBehavior is a behavior made for WUI.
Setting the behavior to a [WuiDom](https://github.com/Wizcorp/wui-Dom) container that would make it able to set tabs,
its content, and be able to have an opening system.

wuiTabBehavior will attach methods and events to the WuiDom element;

When a tab is [tapped](https://github.com/Wizcorp/wui-buttonBehavior) the current content will close,
and the tapped tab's content will open. The status of the tapped tab will be set as 'active'.

[See the full example at the end of the file](#how-to-use)

## Methods

### Constructor

| Parameter | Type | Description
| --------- | ---- | -----------
| tabContainer | _WuiDom_ | Where the tabs will live. Methods will be attach to this WuiDom.
| [contentContainer] | _WuiDom_ | **optional** Where the contents will live.


### addTab

The `tab` will be added to the `tabContainer` and will register a tap event to open its content.
The `content` will be added to the `contentContainer` if specified.
The `id` will be used by other methods as way to refer to it.
If omitted the [name](https://github.com/Wizcorp/wui-Dom) of the `tab` will be used, or a number if no name is defined.

| Parameter | Type | Description
| --------- | ---- | -----------
| tab | _WuiDom_ | The actual tab user will tap on (need [wuiButtonBehavior](https://github.com/Wizcorp/wui-buttonBehavior))
| content | _WuiDom_ | The content to display when when the tap has been tapped
| id | _string_ | **optional** The id to refer to the tab

Note: The first added tab will be considered as active and will be set as the default tab.


### setDefault

| Parameter | Type | Description
| --------- | ---- | -----------
| id | _string_ | The id to refer to the tab


### openDefault

Open the default tab's content and set the tab as active.


### open

Open the content by the specified `id` and set the corresponding tab as active.
It will open the default tab if no `id` is provided

| Parameter | Type | Description
| --------- | ---- | -----------
| id | _string_ | **optional** The id to refer to the tab


### getContent

Return the `content` of the specified `id`.

| Parameter | Type | Description
| --------- | ---- | -----------
| id | _string_ | The id to refer to the tab

Note: might return `undefined` if this is an unknown `id`


### getActiveContent

Return the `content` of current open tab.


## Events

### opened

This event occurs when a tab is open.


## CSS Class

### active

The currently opened content's `tab` will have the class 'active'.


## How to use

See the example below:

```javascript
var WuiDom = require('WuiDom');
var wuiTabBehavior = require('wuiTabBehavior');
var wuiButtonBehavior = require('wuiButtonBehavior');

var view = new WuiDom('div');
var tabs = view.createChild('div', { className: 'tabs' });
var content = view.createChild('div', { className: 'content' });
wuiTabBehavior(tabs, content);


function createTabs(id, label, content) {
    var tab = new WuiDom('div', { text: label });
    wuiButtonBehavior(tab);
    tabs.addTab(tab, content, id);
}

createTabs('red', 'Red Gummy', new WuiDom('div', { text: 'This tab is red' }));
createTabs('green', 'Green Gummy', new WuiDom('div', { text: 'This tab is green' }));
createTabs('blue', 'Blue Gummy', new WuiDom('div', { text: 'This tab is blue' }));

tabs.setDefault('green')

view.on('show', function(id) {
    tabs.open(id);
});

```