function tabsBehavior(tabContainer, contentContainer) {

	var activeTab = null;
	var tabsMap = {};
	var contentMap = {};
	var nextId = 1;
	var defaultTab = null;

	function closeTab(id) {
		tabsMap[id].delClassNames('active');
		if (contentMap[id]) {
			contentMap[id].hide();
		}
	}

	function openTab(id) {
		// don't reopen a tab that's already open

		if (activeTab === id) {
			return;
		}

		// close the active tab

		if (activeTab) {
			closeTab(activeTab);
		}

		// open the tab and make it the active tab
		if (contentMap[id]) {
			contentMap[id].show();
		}

		activeTab = id;
		tabsMap[id].addClassNames('active');
		tabContainer.emit('opened', id);
	}


	tabContainer.getActiveContent = function () {
		return contentMap[activeTab];
	};


	tabContainer.getContent = function (id) {
		return contentMap[id];
	};

	tabContainer.setDefault = function (id) {
		if (tabsMap[id]) {
			defaultTab = id;
		}
	};

	tabContainer.openDefault = function () {
		openTab(defaultTab);
	};


	tabContainer.addTab = function (tab, content, id) {
		// set an ID for this tab

		id = id || tab.getWuiName && tab.getWuiName();

		if (!id) {
			id = nextId;
			nextId += 1;
		}

		if (!defaultTab) {
			defaultTab = id;
		}

		// if there is no active tab yet (should only happen when the bar is still empty),
		// we make this tab the active one

		var isActive = !activeTab;

		tabContainer.appendChild(tab);
		tabsMap[id] = tab;

		if (contentContainer) {
			contentContainer.appendChild(content);
		}
		contentMap[id] = content;

		// set up the tap event handler

		tab.on('tap', function () {
			openTab(id);
		});

		if (isActive) {
			openTab(id);
		} else {
			closeTab(id);
		}

		return id;
	};


	tabContainer.open = function (id) {
		var tab = tabsMap[id];
		if (!tab) {
			return openTab(defaultTab);
		}

		openTab(id);
	};

}

module.exports = tabsBehavior;
