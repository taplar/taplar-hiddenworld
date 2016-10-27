<?php

final class EquipmentController {
	private static $instance;
	
	// restrict instantiation
	private function __clone () {}
	private function __construct () {}
	private function __wakeup () {}
	
	public static function getAnInstance () {
		if ( !self::$instance ) {
			self::$instance = new self();
		}
		
		return self::$instance;
	}
	
	public function attributes ( $httpRequest, $httpResponse ) {
		$equipmentService = RestFramework::getAnInstanceOfTheClass( 'equipmentService', array( $httpResponse ) );
		$results = array();
		
		if ( !empty( $equipmentService ) && !empty( $httpRequest->pathInputs ) ) {
			$accessories = $equipmentService->findAccessoriesByAttribute( $httpRequest->pathInputs[ 0 ] );
			
			if ( !empty( $accessories ) ) {
				$results[ 'accessories' ] = $accessories;
				
				echo json_encode( $results );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
	
	public function categories ( $httpRequest, $httpResponse ) {
		$categoriesByNumber = array(
			'1' => 'weapons'
			, '2' => 'armours'
			, '3' => 'accessories'
			, '4' => 'potions'
			, '5' => 'donations'
		);
		$equipmentService = RestFramework::getAnInstanceOfTheClass( 'equipmentService', array( $httpResponse ) );
		$results = array();
		
		if ( !empty( $equipmentService ) && !empty( $httpRequest->pathInputs ) ) {
			$equipmentByCategory = $equipmentService->findByCategory( $httpRequest->pathInputs[ 0 ] );
			
			if ( !empty( $equipmentByCategory ) ) {
				$category = $categoriesByNumber[ $httpRequest->pathInputs[ 0 ] ];
				$results[ $category ] = $equipmentByCategory;
				
				echo json_encode( $results );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
	
	public function levels ( $httpRequest, $httpResponse ) {
		$equipmentService = RestFramework::getAnInstanceOfTheClass( 'equipmentService', array( $httpResponse ) );
		$results = array();
		
		if ( !empty( $equipmentService ) && !empty( $httpRequest->pathInputs ) ) {
			$results[ 'donations' ] = $equipmentService->findDonationsByLevel( $httpRequest->pathInputs[ 0 ] );
			$results[ 'weapons' ] = $equipmentService->findWeaponsByLevel( $httpRequest->pathInputs[ 0 ] );
			$results[ 'armours' ] = $equipmentService->findArmoursByLevel( $httpRequest->pathInputs[ 0 ] );
			$results[ 'accessories' ] = $equipmentService->findAccessoriesByLevel( $httpRequest->pathInputs[ 0 ] );
			$results[ 'potions' ] = $equipmentService->findPotionsByLevel( $httpRequest->pathInputs[ 0 ] );
			$results[ 'monsters' ] = $equipmentService->findMonstersByLevel( $httpRequest->pathInputs[ 0 ] );
			
			if ( !empty( $results[ 'donations' ] )
			|| !empty( $results[ 'weapons' ] )
			|| !empty( $results[ 'armours' ] )
			|| !empty( $results[ 'accessories' ] )
			|| !empty( $results[ 'potions' ] ) ) {
				echo json_encode( $results );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
	
	public function towns ( $httpRequest, $httpResponse ) {
		$equipmentService = RestFramework::getAnInstanceOfTheClass( 'equipmentService', array( $httpResponse ) );
		$results = array();
		
		if ( !empty( $equipmentService ) && !empty( $httpRequest->pathInputs ) ) {
			$monsters = $equipmentService->findMonstersByTown( $httpRequest->pathInputs[ 0 ] );
			
			if ( !empty( $monsters ) ) {
				$results[ 'monsters' ] = $monsters;
				
				echo json_encode( $results );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
	
	public function types ( $httpRequest, $httpResponse ) {
		$equipmentService = RestFramework::getAnInstanceOfTheClass( 'equipmentService', array( $httpResponse ) );
		$results = array();
		
		if ( !empty( $equipmentService ) && !empty( $httpRequest->pathInputs ) ) {
			$weapons = $equipmentService->findWeaponsByType( $httpRequest->pathInputs[ 0 ] );
			
			if ( !empty( $weapons ) ) {
				$results[ 'weapons' ] = $weapons;
				
				echo json_encode( $results );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
}

?>
