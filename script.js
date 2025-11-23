$(document).ready(function(){

    // Helper functions
    function isLettersOnly(input){ return /^[A-Za-z\s]+$/.test(input); }
    function isNumbersOnly(input){ return /^[0-9]+$/.test(input); }
    function isValidEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

    // Validation fields
    const fields = [
        {id: '#last-name', validator: isLettersOnly, required: true},
        {id: '#first-name', validator: isLettersOnly, required: true},
        {id: '#middle-name', validator: isLettersOnly, required: true},
        {id: '#ext-name', validator: isLettersOnly, required: false},
        {id: '#contact-number', validator: (val)=>isNumbersOnly(val) && val.length===11, required: true},
        {id: '#email', validator: isValidEmail, required: true},
        {id: '#home-address', validator: (val)=>val.trim() !=='', required: true},
        {id: '#student-number', validator: isNumbersOnly, required: true},
        {id: '#program', validator: (val)=>val.trim()!=='', required: true},
        {id: '#year-level', validator: (val)=>val.trim()!=='', required: true},
        {id: '#section', validator: (val)=>val.trim()!=='', required: true}
    ];

    // Real-time validation using keyup() and blur()
    fields.forEach(field => {
        const errorSpan = $(field.id + '-error');
        $(field.id).on('keyup blur', function(){
            const val = $(this).val().trim();
            if(field.required && val === ''){
                $(this).css('border', '2px solid red');
                errorSpan.text('This field is required');
            } else if(!field.validator(val)){
                $(this).css('border', '2px solid red');
                errorSpan.text('Invalid input');
            } else {
                $(this).css('border', '2px solid green');
                errorSpan.text('');
            }
        });
    });

    // Gender validation
    $('#gender').on('change blur', function(){
        const val = $(this).val();
        if(val === ''){
            $(this).css('border', '2px solid red');
            $('#gender-error').text('Select Gender');
        } else {
            $(this).css('border', '2px solid green');
            $('#gender-error').text('');
        }
    });

    // Birthdate validation
    $('#birthdate').on('change blur', function(){
        const val = $(this).val();
        if(val === ''){
            $(this).css('border', '2px solid red');
            $('#birthdate-error').text('Birthdate is required');
        } else {
            $(this).css('border', '2px solid green');
            $('#birthdate-error').text('');
        }
    });

    // Form submission
    $('#registration-form').submit(function(e){
        e.preventDefault();
        let valid = true;

        // Trigger validation for all fields
        fields.forEach(f => $(f.id).trigger('blur'));
        $('#gender').trigger('blur');
        $('#birthdate').trigger('blur');

        // Terms checkbox
        if(!$('#agree-terms').is(':checked')){
            $('#terms-error').text('You must agree to terms');
            valid = false;
        } else {
            $('#terms-error').text('');
        }

        // Check for any errors
        $('.error').each(function(){
            if($(this).text() !== ''){
                valid = false;
            }
        });

        // Submit success
        if(valid){
            $('#loading').show();
            $('#success-message').hide();
            setTimeout(function(){
                $('#loading').hide();
                $('#success-message').show();
                $('#registration-form')[0].reset();
                $('input, select').css('border', '1px solid #999');
            }, 2000);
        }
    });
});
