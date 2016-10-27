<?php

final class RestFrameworkHttpRequest {
	private static $instance;
	public $action;
	public $controller;
	public $method;
	public $parameterInputs;
	public $pathInputs;
	public $rawInput;
	
	// restrict instantiation
	private function __clone () {}
	private function __construct () {}
	private function __wakeup () {}
	
	public static function getAnInstance () {
		if ( !self::$instance ) {
			self::$instance = new self();
			
			self::$instance->loadTheRequest();
		}
		
		return self::$instance;
	}
	
	private function loadTheAction ( $action ) {
		if ( !empty( $action ) ) {
			$this->action = $action;
		}
	}
	
	private function loadTheController ( $controllerPrefix ) {
		if ( !empty( $controllerPrefix ) ) {
			$this->controller = $controllerPrefix .'Controller';
			
			return true;
		}
		
		return false;
	}
	
	private function loadTheRawInput () {
		$input = file_get_contents( 'php://input' );
		
		if ( !empty( $input ) ) {
			$data = json_decode( $input );
			
			if ( !empty( $data ) ) {
				$this->parameterInputs = array_merge( $this->parameterInputs, get_object_vars( $data ) );
			} else {
				$this->rawInput = $input;
			}
		}
	}
	
	private function loadTheRequest () {
		$this->method = $_SERVER[ "REQUEST_METHOD" ];
		
		$this->processTheRequestURL();
	}
	
	private function loadTheRequestInputs ( $pathParameters ) {
		$this->parameterInputs = array();
		$this->pathInputs = array();
		
		if ( !empty( $pathParameters ) ) {
			$this->pathInputs = $pathParameters;
		}
		
		if ( !empty( $_GET ) ) {
			$this->parameterInputs = array_merge( $this->parameterInputs, $_GET );
		}
		
		if ( !empty( $_POST ) ) {
			$this->parameterInputs = array_merge( $this->parameterInputs, $_POST );
		} else if ( $this->method === 'POST' || $this->method === 'PUT' ) {
			$this->loadTheRawInput();
		}
	}
	
	private function processTheRequestURL () {
		$uri = $_SERVER[ 'REDIRECT_URL' ];
		$uriTokens = explode( '/', $uri );
		
		while ( !empty( $uriTokens ) && array_shift( $uriTokens ) != 'api' );
		
		if ( !empty( $uriTokens ) ) {
			if ( $this->loadTheController( array_shift( $uriTokens ) ) && !empty( $uriTokens ) ) {
				$this->loadTheAction( array_shift( $uriTokens ) );
			}
			
			$this->loadTheRequestInputs( $uriTokens );
		}
	}
}

final class RestFrameworkHttpResponse {
	private static $instance;
	private static $BAD_REQUEST = '400 Bad Request';
	private static $HTTP = 'HTTP/1.0 ';
	private static $INTERNAL_ERROR = '500 Internal Error';
	
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
	
	public function setTheResponseStatusToBadRequest () {
		header( self::$HTTP . self::$BAD_REQUEST );
	}
	
	public function setTheResponseStatusToInternalError () {
		header( self::$HTTP . self::$INTERNAL_ERROR );
	}
}

final class RestFramework {
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
	
	public static function getAnInstanceOfTheClass ( $fileName, $params = NULL ) {
		if ( empty( $fileName ) || !ctype_alnum( $fileName ) ) {
			return NULL;
		}
		
		$pathToTheClass = self::getThePathToTheClass( $fileName );
		
		if ( empty( $pathToTheClass ) ) {
			return NULL;
		}
		
		$className = ucfirst( $fileName );
		
		return self::includeTheFileAndInstantiateTheClass( $pathToTheClass, $className, $params );
	}
	
	private static function getThePathToTheClass ( $className ) {
		$pathToTheClass = NULL;
		$classNameReversed = strrev( $className );
		
		if ( !empty( $className ) ) {
			if ( strpos( $classNameReversed, strrev( 'Controller' ) ) === 0 ) {
				$pathToTheClass = 'controllers/'. $className .'.php';
			} else if ( strpos( $classNameReversed, strrev( 'Service' ) ) === 0 ) {
				$pathToTheClass = 'services/'. $className .'.php';
			}
		}
		
		return $pathToTheClass;
	}
	
	private static function includeTheFileAndInstantiateTheClass ( $filePath, $className, $params = NULL ) {
		$instance = NULL;
		
		if ( !empty( $filePath ) && file_exists( $filePath ) ) {
			include_once $filePath;
			
			if ( !method_exists( $className, 'getAnInstance' ) ) {
				$dynamicClass = new ReflectionClass( $className );
				
				if ( empty( $params ) ) {
					$instance = $dynamicClass->newInstanceArgs();
				} else {
					$instance = $dynamicClass->newInstanceArgs( $params );
				}
			} else {
				if ( empty( $params ) ) {
					$instance = call_user_func( $className .'::getAnInstance' );
				} else {
					$instance = call_user_func_array( $className .'::getAnInstance', $params );
				}
			}
		}
		
		return $instance;
	}
	
	public function routeTheRequest () {
		$httpRequest = RestFrameworkHttpRequest::getAnInstance();
		$httpResponse = RestFrameworkHttpResponse::getAnInstance();
		
		if ( !empty( $httpRequest->controller ) ) {
			$controller = $this->getAnInstanceOfTheClass( $httpRequest->controller );
			
			if ( !empty( $controller ) ) {
				$this->routeTheRequestToTheController( $controller, $httpRequest, $httpResponse );
				return;
			}
		}
		
		$httpResponse->setTheResponseStatusToBadRequest();
	}
	
	private function routeTheRequestToTheController ( $controller, $httpRequest, $httpResponse ) {
		$methodToActionMap = array(
			'DELETE'	=> 'delete'
			, 'GET'		=> 'read'
			, 'POST'	=> 'create'
			, 'PUT'		=> 'update'
		);
		
		if ( !empty( $httpRequest->action ) && !method_exists( $controller, $httpRequest->action ) ) {
			array_unshift( $httpRequest->pathInputs, $httpRequest->action );
			
			$httpRequest->action = NULL;
		}
		
		if ( empty( $httpRequest->action ) ) {
			$httpRequest->action = $methodToActionMap[ $httpRequest->method ];
			
			if ( !method_exists( $controller, $httpRequest->action ) ) {
				$httpRequest->action = NULL;
			}
		}
		
		if ( !empty( $httpRequest->action ) ) {
			$controller->{ $httpRequest->action }( $httpRequest, $httpResponse );
		} else {
			$httpResponse->setTheResponseStatusToBadRequest();
		}
	}
}

?>