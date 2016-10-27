<?php

final class Configuration {
	private static $instance;
	private static $DATABASE_NAME = 'hiddenworld';
	private static $DATABASE_USERNAME = 'root';
	private static $DATABASE_USERPASS = 'root';
	
	private function __clone () {}
	private function __construct () {}
	
	public static function getAnInstance () {
		if ( !self::$instance ) {
			self::$instance = new self();
		}
		
		return self::$instance;
	}
	
	public function databaseName		() { return self::$DATABASE_NAME; }
	public function databasePassword	() { return self::$DATABASE_USERPASS; }
	public function databaseUsername	() { return self::$DATABASE_USERNAME; }
}

?>
