<?php

try {
	include_once './configuration.php';
	include_once './restFramework.php';
	
	RestFramework::getAnInstance()->routeTheRequest();
} catch ( Exception $e ) {
	error_log( $e );
	header( "HTTP/1.0 500 Internal Error" );
}

?>
