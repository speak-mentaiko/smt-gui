/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    //
    // SCD30
    //
    Generator.sensor_scd30_init = function (block) {
	Generator.prepares_['i2c'] = Generator.mboard3_i2c_init(null);
        return  `scd30 = SCD30.new(i2c)\n`;
    };
    
    Generator.sensor_scd30_status = function (block) {
        Generator.prepares_['i2c_scd30'] = Generator.sensor_scd30_init(null);
        return [`scd30.is_ready?`, Generator.ORDER_ATOMIC];
    };

    Generator.sensor_scd30 = function (block) {
        Generator.prepares_['i2c_scd30'] = Generator.sensor_scd30_init(null);
        const type = Generator.getFieldValue(block, 'TYPE') || null;
        return [`scd30.${type}`, Generator.ORDER_ATOMIC];
    };
    
    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.mboard1_menu_menu1 = function (block) {
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
