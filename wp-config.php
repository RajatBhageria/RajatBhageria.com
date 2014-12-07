<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'cafemoch_wo9243');

/** MySQL database username */
define('DB_USER', 'cafemoch_wo9243');

/** MySQL database password */
define('DB_PASSWORD', 'oaGHKybr8IXp');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'ERy>-VX*QAD^iyzOTG$HX%zNjUjDadhe;c+w$D-_Kk(PlIpkSjSpmiqX&oh}s!+*GsvrnKC%F<o-j|RIsExpr-___Dr}xN$$@FZlzj%Ww?Z*IriIY-D-(pi<BAAeWHFt');
define('SECURE_AUTH_KEY', ';SJ?Lu@JmS{cU/?see/)=bEjhcSn$ew$TOw%}@vJXi%bPOWqg=DQ|-vk-<$])vXySC&%mh|uKgkDHw^-?Dbre}NX-|dPHa{-?CixLpO)*Ap+{dTqQK-?jnfhq/yWErkC');
define('LOGGED_IN_KEY', 'H>?(lOuQa{<(^ks(jRb_{nAzL*Q[eFsC]?u%_+;Y}hIt/{fzIIiDLQ?Zg=FHgbG(b]^^HhXeedKESh=(H&M-yX&nU>[XuN>w&/ByXk=l()+NO^{X/hqB}^xJ{jP;XSxl');
define('NONCE_KEY', 'S>hV?K^WUctLUGtvSC_L+aD-liTXJTBrwy|RO<rQQ&fKM+*qopKleB*krX|+;d[UDbNTgFXTl@Wcbv@ZD%d&i]C|[vALzWLSVX(R$c<K(;pI)k/NKmJ*zFbevTGZqzi%');
define('AUTH_SALT', 'N?=mX)IRpGrE?-?(VFs<*-y[P_xdNCW$sq@_ssDL==?(G&<=tjU/vHnOAxLvkVcWMTueF)Ga-be(>?R;dK>iIqG/STBduKg$rl_b/|>&}qdzRb[>TgcJXiLpEZ+Punk*');
define('SECURE_AUTH_SALT', '>CUvtqOjYYP<R}EokeKc<i%duZsJ>]/&xRJum<XJj_q%;[PbMul-YlFylR*|Vncl<jm[$N)cu(!lw>&/VKTAmP]SzjPbY/Fj+kuPczGDpN]T<S$*a?oO+h;eg/JvD-t(');
define('LOGGED_IN_SALT', 'V$hq|R%;Fs->U>e)vNhSevEq<icYDy-YAZsMwsH-^eVKnKa$Kmo<oYRjUeX{A%rHi<{d]aEAF}H{JwL!Sy>exzmeF]Y|T/Yh)H|uxa<BdlGL/XCFAWFiEiYTNGDPfz/c');
define('NONCE_SALT', 'XJ/!de+ZBHVyG<HJUzquBn{NvD=g<)TZp)gAlWVRK/!rOuBu_rG({m!cyg*Snp(JVGBA&Cq=GKq-Nk<TTm!Sacb(nGwVH&w_<x?QPJ=)%o)JDi%jPw{^LRpXElTOevKb');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_igjl_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

/**
 * Include tweaks requested by hosting providers.  You can safely
 * remove either the file or comment out the lines below to get
 * to a vanilla state.
 */
if (file_exists(ABSPATH . 'hosting_provider_filters.php')) {
	include('hosting_provider_filters.php');
}
