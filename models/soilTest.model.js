const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const SoilTestSchema = new Schema({
    SoilLabId: Schema.Types.Number,
    SoilLabName:Schema.Types.String,
    SoilTestName:Schema.Types.String,
    ST_Date: Schema.Types.String,
    ST_SoilType: Schema.Types.Number,
    ST_LayerDepth: Schema.Types.Number,
    ST_CEC: Schema.Types.Number,
    ST_BulkDensity: Schema.Types.Number,
    ST_OM: Schema.Types.Number,
    ST_EC_Val: Schema.Types.Number,
    ST_PH_Val: Schema.Types.Number,
    ST_AverageTemp: Schema.Types.Number,
    EM_N_Cbo: Schema.Types.Number,
    EM_P_Cbo: Schema.Types.Number,
    EM_K_Cbo: Schema.Types.Number,
    EM_Ca_Cbo: Schema.Types.Number,
    EM_Mg_Cbo: Schema.Types.Number,
    EM_S_Cbo: Schema.Types.Number,
    EM_B_Cbo: Schema.Types.Number,
    EM_Fe_Cbo: Schema.Types.Number,
    EM_Mn_Cbo: Schema.Types.Number,
    EM_Zn_Cbo: Schema.Types.Number,
    EM_Cu_Cbo: Schema.Types.Number,
    EM_Mo_Cbo: Schema.Types.Number,
    EM_Na_Cbo: Schema.Types.Number,
    EM_Al_Cbo: Schema.Types.Number,
    EM_Cl_Cbo: Schema.Types.Number,
    N_Val: Schema.Types.Number,
    P_Val: Schema.Types.Number,
    K_Val: Schema.Types.Number,
    Ca_Val: Schema.Types.Number,
    Mg_Val: Schema.Types.Number,
    S_Val: Schema.Types.Number,
    B_Val: Schema.Types.Number,
    Fe_Val: Schema.Types.Number,
    Mn_Val: Schema.Types.Number,
    Zn_Val: Schema.Types.Number,
    Cu_Val: Schema.Types.Number,
    Mo_Val: Schema.Types.Number,
    Na_Val: Schema.Types.Number,
    HCO3_Val: Schema.Types.Number,
    CL_Val: Schema.Types.Number,
    UnitId:Schema.Types.Number
});

module.exports = mongoose.model('SoilTest', SoilTestSchema);