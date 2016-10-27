<?php

final class EquipmentService {
	private static $instance;
	private $httpResponse;
	
	// restrict instantiation
	private function __clone () {}
	private function __construct () {}
	private function __wakeup () {}
	
	public static function getAnInstance ( $httpResponse ) {
		if ( !self::$instance ) {
			self::$instance = new self();
			
			self::$instance->httpResponse = $httpResponse;
		}
		
		return self::$instance;
	}
	
	public function findAccessoriesByAttribute ( $attributeNumber ) {
		$attributeByNumber = array(
			'1' => '%Abs%'
			, '2' => '%Chr%'
			, '3' => '%Con%'
			, '4' => '%Dex%'
			, '5' => '%Evd%'
			, '6' => '%HP %'
			, '7' => '%HpRegn%'
			, '8' => '%Int%'
			, '9' => '%Mana%'
			, '10' => '%Spd%'
			, '11' => '%Sth%'
			, '12' => '%Wis%'
		);
		$attribute = $attributeByNumber[ $attributeNumber ];
		
		if ( !empty( $attribute ) ) {
			$results = $this->findAllTheAccessoriesByAttribute( $attribute );
		} else {
			$results = array();
		}
		
		return $results;
	}
	
	public function findAccessoriesByLevel ( $level ) {
		return $this->findAllTheAccessoriesByLevel( $level );
	}
	
	private function findAllTheAccessories () {
		$accessories = array();
		$query = 'SELECT name, level, element, effect, towns FROM hw_items ORDER BY level ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $effect, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $accessories, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'effect' => $effect
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $accessories;
	}
	
	private function findAllTheAccessoriesByAttribute ( $attribute ) {
		$accessories = array();
		$query = 'SELECT name, level, element, effect, towns FROM hw_items WHERE effect LIKE ? ORDER BY level ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 's', $attribute );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $effect, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $accessories, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'effect' => $effect
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $accessories;
	}
	
	private function findAllTheAccessoriesByLevel ( $level ) {
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
		} else {
			return array();
		}
		
		$accessories = array();
		$query = 'SELECT name, level, element, effect, towns FROM hw_items WHERE level <= ? ORDER BY level DESC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 'i', $level );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $effect, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $accessories, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'effect' => $effect
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $accessories;
	}
	
	private function findAllTheArmours () {
		$armours = array();
		$query = 'SELECT name, level, element, absorb, evade, towns FROM hw_armours ORDER BY level, absorb, evade ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $absorb, $evade, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $armours, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'absorb' => $absorb
				, 'evade' => $evade
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $armours;
	}
	
	private function findAllTheArmoursByLevel ( $level ) {
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
		} else {
			return array();
		}
		
		$armours = array();
		$query = 'SELECT name, level, element, absorb, evade, towns FROM hw_armours WHERE level BETWEEN ? - 3 AND ? ORDER BY level DESC, absorb DESC, evade DESC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 'ii', $level, $level );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $absorb, $evade, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $armours, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'absorb' => $absorb
				, 'evade' => $evade
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $armours;
	}
	
	private function findAllTheDonations () {
		$donations = array();
		
		for ( $i = 1; $i < 100; $i++ ) {
			array_push(
				$donations
				, array(
					"level" => $i
					, "donation" => ( $i * $i * 120 )
				)
			);
		}
		
		return $donations;
	}
	
	private function findAllTheDonationsByLevel ( $level ) {
		$donations = array();
		
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
			
			array_push(
				$donations
				, array(
					"level" => $level
					, "donation" => ( $level * $level * 120 )
				)
			);
		}
		
		return $donations;
	}
	
	private function findAllTheMonstersByLevel ( $level ) {
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
		} else {
			return array();
		}
		
		$monsters = array();
		$query = 'SELECT name, level, place FROM hw_monsters WHERE level BETWEEN ? - 3 AND ? ORDER BY level DESC, place ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 'ii', $level, $level );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $place );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $monsters, array(
				'name' => $name
				, 'level' => $level
				, 'place' => $place
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $monsters;
	}
	
	private function findAllTheMonstersByTown ( $town ) {
		$monsters = array();
		$query = 'SELECT name, level FROM hw_monsters WHERE place = ? ORDER BY level';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 's', $town );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $monsters, array(
				'name' => $name
				, 'level' => $level
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $monsters;
	}
	
	private function findAllThePotions () {
		$potions = array();
		$query = 'SELECT name, levelmin, levelmax, effect, description FROM hw_potions ORDER BY levelmin, levelmax, name';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $levelmin, $levelmax, $effect, $description );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $potions, array(
				'name' => $name
				, 'levelmin' => $levelmin
				, 'levelmax' => $levelmax
				, 'effect' => $effect
				, 'description' => $description
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $potions;
	}
	
	private function findAllThePotionsByLevel ( $level ) {
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
		} else {
			return array();
		}
		
		$potions = array();
		$query = 'SELECT name, levelmin, levelmax, effect, description FROM hw_potions WHERE levelmin <= ? AND levelmax >= ? ORDER BY levelmin DESC, levelmax, name';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 'ii', $level, $level );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $levelmin, $levelmax, $effect, $description );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $potions, array(
				'name' => $name
				, 'levelmin' => $levelmin
				, 'levelmax' => $levelmax
				, 'effect' => $effect
				, 'description' => $description
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $potions;
	}
	
	private function findAllTheWeapons () {
		$weapons = array();
		$query = 'SELECT name, level, element, damage, towns FROM hw_weapons ORDER BY level, damage ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $damage, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $weapons, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'damage' => $damage
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $weapons;
	}
	
	private function findAllTheWeaponsByLevel ( $level ) {
		if ( ctype_digit( $level ) ) {
			$level = intval( $level );
		} else {
			return array();
		}
		
		$weapons = array();
		$query = 'SELECT name, level, element, damage, towns FROM hw_weapons WHERE level BETWEEN ? - 3 AND ? ORDER BY level DESC, damage DESC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 'ii', $level, $level );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $damage, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $weapons, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'damage' => $damage
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $weapons;
	}
	
	private function findAllTheWeaponsByType ( $type ) {
		$weapons = array();
		$query = 'SELECT name, level, element, damage, towns FROM hw_weapons WHERE type = ? ORDER BY level, damage ASC';
		$databaseService = RestFramework::getAnInstanceOfTheClass( 'databaseService' )->connect();
		$preparedStatement = $databaseService->prepareStatement( $query );
		
		$preparedStatement->bind_param( 's', $type );
		$preparedStatement->execute();
		$preparedStatement->bind_result( $name, $level, $element, $damage, $towns );
		
		while ( $preparedStatement->fetch() ) {
			array_push( $weapons, array(
				'name' => $name
				, 'level' => $level
				, 'element' => $element
				, 'damage' => $damage
				, 'towns' => $towns
			) );
		}
		
		$preparedStatement->close();
		$databaseService->disconnect();
		
		return $weapons;
	}
	
	public function findArmoursByLevel ( $level ) {
		return $this->findAllTheArmoursByLevel( $level );
	}
	
	public function findByCategory ( $category ) {
		switch ( $category ) {
			case '1':
				$results = $this->findAllTheWeapons();
				break;
			case '2':
				$results = $this->findAllTheArmours();
				break;
			case '3':
				$results = $this->findAllTheAccessories();
				break;
			case '4':
				$results = $this->findAllThePotions();
				break;
			case '5':
				$results = $this->findAllTheDonations();
				break;
			default:
				$results = array();
		}
		
		return $results;
	}
	
	public function findDonationsByLevel ( $level ) {
		return $this->findAllTheDonationsByLevel( $level );
	}
	
	public function findMonstersByLevel ( $level ) {
		return $this->findAllTheMonstersByLevel( $level );
	}
	
	public function findMonstersByTown ( $townNumber ) {
		return $this->findAllTheMonstersByTown( $townNumber );
	}
	
	public function findPotionsByLevel ( $level ) {
		return $this->findAllThePotionsByLevel( $level );
	}
	
	public function findWeaponsByLevel ( $level ) {
		return $this->findAllTheWeaponsByLevel( $level );
	}
	
	public function findWeaponsByType ( $typeNumber ) {
		return $this->findAllTheWeaponsByType( $typeNumber );
	}
}

?>
