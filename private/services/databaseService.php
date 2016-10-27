<?php

final class DatabaseService {
	private $configuration;
	private $connection;
	
	// restrict instantiation
	private function __clone () {}
	private function __construct () {}
	private function __wakeup () {}
	
	public static function getAnInstance () {
		$instance = new self();
		$instance->configuration = Configuration::getAnInstance();
		
		return $instance;
	}
	
	public function connect () {
		$this->connection = new mysqli(
			'localhost'
			, $this->configuration->databaseUsername()
			, $this->configuration->databasePassword()
			, $this->configuration->databaseName() );
		
		if ( mysqli_connect_errno() ) {
			$this->connection = NULL;
			
			throw new Exception( 'Unable to connect to the database: '. mysqli_connect_errno() );
		}
		
		return $this;
	}
	
	public function disconnect () {
		if ( !empty( $this->connection ) ) {
			$this->connection->close();
			
			$this->connection = NULL;
		}
		
		return $this;
	}
	
	public function prepareStatement ( $query ) {
		if ( !empty( $this->connection ) ) {
			return $this->connection->prepare( $query );
		} else {
			throw new Exception( 'Cannot prepare statement. Database connection is not open.' );
		}
	}
}

?>
