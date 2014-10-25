function getPageLeftOffsetByBlock($block_inner) {
	var $page_block = $block_inner.parents('.page_block');
	if ($page_block.outerWidth() == $block_inner.width()) {
		return $page_block.position().left;
	}

	return ($page_block.outerWidth() - $block_inner.width()) / 2;
}

function getPageLeftOffset($widget) {
	var $block_inner = $widget.parents('div[class^="block_inner"]');

	return getPageLeftOffsetByBlock($block_inner);
}