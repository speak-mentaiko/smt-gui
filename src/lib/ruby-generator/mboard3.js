/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    //
    // LCD
    //
    Generator.mboard3_i2c_init = function (block) {
        return `i2c = I2C.new(22, 21)\n`;
    }; 

    Generator.mboard3_i2c_lcd_init = function (block) {
        Generator.prepares_['i2c'] = Generator.mboard3_i2c_init(null);
        return `lcd = AQM0802A.new(i2c)\n` ;
    }; 

    Generator.mboard3_monitor = function (block) {
        Generator.prepares_['i2c_lcd'] = Generator.mboard3_i2c_lcd_init(null);
        const num  = Generator.getFieldValue(block, 'NUM',  Generator.ORDER_NONE) || 0;
	const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `lcd.cursor(0, ${num})\n` +
               `lcd.write_string("        ")\n`+
               `lcd.cursor(0, ${num})\n` + 	    
               `lcd.write_string((${text}).to_s)\n`;
    };

    //
    // Wi-Fi
    //    
    Generator.mboard3_wifi_init = function (block) {
        const ssid = Generator.valueToCode(block, 'SSID', Generator.ORDER_NONE);
        const pass = Generator.valueToCode(block, 'PASS', Generator.ORDER_NONE);
        return `wlan = WLAN.new('STA', WLAN::ACTIVE)\n` +
	       `wlan.connect(${ssid}, ${pass}) \n`;
    };

    Generator.mboard3_wifi_connected = function (block) {
        return [`wlan.is_connected?`, Generator.ORDER_ATOMIC];
    };
    
    //
    // RTC
    //
    Generator.mboard3_rtc_init = function (block) {
        Generator.prepares_['i2c'] = Generator.mboard3_i2c_init(null);
        return `sntp = SNTP.new \n` +
            `rtc = RX8035SA.new(i2c)\n`+
	    `rtc.write( sntp.datetime ) \n`;	   
    };

    Generator.mboard3_rtc_date = function (block) {
        const time = Generator.getFieldValue(block, 'TEXT') || null;
	return [`rtc.${time}`, Generator.ORDER_ATOMIC];
    };    


    //
    // 送信
    // 
    Generator.mboard3_send = function (block) {
	const srv  = Generator.valueToCode(block,  'TEXT1', Generator.ORDER_NONE) || null;
	const name = Generator.valueToCode(block,  'TEXT2', Generator.ORDER_NONE) || null;
	const time = Generator.valueToCode(block,  'TEXT3', Generator.ORDER_NONE) || null;
        const key  = Generator.getFieldValue(block, 'VAR1', Generator.ORDER_NONE) || null;
	const val  = Generator.valueToCode(block,  'TEXT4', Generator.ORDER_NONE) || null;
        const tz   = Generator.getFieldValue(block,'VAR2', Generator.ORDER_NONE) || null;
        return  `url = sprintf("%s?hostname=%s&time=%s&${key}=%f&utc=%d",${srv},${name},${time},${val},${tz})\n` +
		 `wlan.access( url )\n`;
    };

    //
    // GPS
    //
/*
    Generator.mboard3_uart_gps_init = function (block) {
        Generator.prepares_['uart'] = Generator.mboard3_uart_init(null);
        return `gps_pw = GPIO.new(5, GPIO::OUT)\n` +
	       `gps_pw.write(0)\n` +
 	       `uart = UART.new(2, 9600)\n` +
	       `gps = GPS.new(uart, GPS::RMSmode) \n` ;
    };

    Generator.mboard3_uart_gps_status = function (block) {
	Generator.prepares_['uart_gps'] = Generator.mboard3_uart_gps_init(null);
        return [`gps.is_ready?`, Generator.ORDER_ATOMIC];
    };

    Generator.mboard3_uart_gps = function (block) {
	Generator.prepares_['uart_gps'] = Generator.mboard3_uart_gps_init(null);
        const data = Generator.getFieldValue(block, 'DATA') || null;
        return [`gps.${data}`, Generator.ORDER_ATOMIC];
    };
*/

    
    
    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.mboard3_menu_menu1 = function (block) {
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu2 = function (block) {
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu3 = function (block) {
        const menu3 = Generator.getFieldValue(block, 'menu3') || null;
        return [menu3, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu4 = function (block) {
        const menu4 = Generator.getFieldValue(block, 'menu4') || null;
        return [menu4, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu5 = function (block) {
        const menu5 = Generator.getFieldValue(block, 'menu5') || null;
        return [menu5, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
