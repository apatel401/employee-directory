<?php

/*
  Plugin Name: employee directory
  Version: 1.0
  Author: Akash
  Author URI: https://apatelportfolio.netlify.app
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function employeeDirectory() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'employeeDirectory' );