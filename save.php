<?php

$page = $_POST['page'];

$fp = fopen('saved/index.html', 'w');
if (!$fp) {
	echo 'Error. Not saved';
	exit;
}

$page = stripslashes($page);
$page = preg_replace("/[\t\r\n]+/", '', $page);

fwrite($fp, $page);

fclose($fp);

echo 'saved';