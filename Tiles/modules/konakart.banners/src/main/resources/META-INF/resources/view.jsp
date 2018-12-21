<%@ include file="/init.jsp" %>

<script>
		$(function() {
			kk.setSearchTileDivId("search-tile");
			kk.renderSearchTile();

			kk.setBannerTileDivId("banner");
			kk.renderBanner();
		});
	</script>
	<div id="kk-portlet-body">
		<div id="search-tile">
		<div id="banner"></div>
		<div class="kk-spinner-large"/></div>
	</div>