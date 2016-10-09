var React = require('react');

module.exports = {

    cleanSchema: function(schema) {
        if( '$schema' in schema )
            delete schema["$schema"];

        return schema;
    },

    recognizeSchema: function(key, pieceOfSchema, profondita) {

        if( pieceOfSchema.type === "string" ){
            if( 'enum' in pieceOfSchema ){
                var SelectInput = require('./schemi/Select.react.jsx');
                return <SelectInput key={key} schema={pieceOfSchema} />;
            }else{
                var StringInput = require('./schemi/String.react.jsx');
                return <StringInput key={key} schema={pieceOfSchema} />;
            }
        }

        if( pieceOfSchema.type === "boolean" ){
            var CheckboxInput = require('./schemi/Checkbox.react.jsx');
            return <CheckboxInput key={key} schema={pieceOfSchema} />;
        }

        if( pieceOfSchema.type === "object" ){
            var ObjectInput = require('./schemi/Object.react.jsx');
            return <ObjectInput key={key} schema={pieceOfSchema} />;
        }

        if( pieceOfSchema.type === "array" ){
            var ArrayInput = require('./schemi/Array.react.jsx');
            return <ArrayInput key={key} schema={pieceOfSchema} />;
        }
    }

};