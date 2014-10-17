<?php

$page = $_GET['page'];


//copy('base.html', 'saved/index.html');

$fp = fopen('saved/index.html', 'w');
if (!$fp) {
	echo 'Error. Not saved';
	exit;
}

$page = stripslashes($page);
$page = preg_replace("/[\t\r\n]+/", '', $page);

fwrite($fp, $page);

/*fwrite($fp, '
	</body>
	</html>');*/

fclose($fp);

echo 'saved';