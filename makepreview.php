<?php

$page = $_POST['page'];


copy('base.html', 'preview/index.html');
$fp = fopen('preview/index.html', 'a');
if (!$fp) {
	echo 'Error. Not saved';
	exit;
}

$page = stripslashes($page);
fwrite($fp, $page);

fwrite($fp, '
	</div>
	</body>
	</html>');

fclose($fp); 

echo 'saved';