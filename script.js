/* Pedro Ramirez
codeworks challenge
October/2020

-Contact list web application
Users can create, update, delete, and search for contacts.
 */

$(function() {

    // new array to storage the contacts
    let contacts = [];

    // every contact must have a unique id, it starts -1 
    let uniqueId = -1;

    $("#submitForm").on('click', function() {

        // in order to submit a new contact, users must input at least the name of the contact
        let val = $('#fName').val();

        // if no name is provided, then code will not run
        if (val !== '') {

            // if a new contact is created then the id increments
            uniqueId++

            // the id is customize, because a single number id is too generic
            let contactId = `contact-${uniqueId}`;

            // new variable is created to storage every contact in an unorder list
            let newUnorderList = $('<ul></ul>').addClass('newContact').attr('id', contactId);

            // a new unorder list is append to the section with class item-c
            $('.item-c').append(newUnorderList);

            // new variables to get input values
            let nameInput = $('#fName').val();
            let surInput = $('#sName').val();
            let phoneInput = $('#pNumber').val();
            let addressInput = $('#address').val();

            // every contact is push to the array as an object(key:value)
            contacts.push({
                    name: nameInput,
                    surName: surInput,
                    phone: phoneInput,
                    address: addressInput,
                    id: contactId
                }

            );

            // appending every input value to the unorder list
            newUnorderList.append('<li>' + nameInput + " " + surInput + '</li>');
            newUnorderList.append('<li>' + phoneInput + '</li');
            newUnorderList.append('<li>' + addressInput + '</li>');

            // appending and creating buttons(delete and update)
            newUnorderList.append(`<br><button id='delete-${contactId}'>Delete</button>`, `<button id='update-${contactId}'>Update</button>`);


            // delete button
            $(`#delete-${contactId}`).click(function() {
                // creating a new variable to get the current ul tag
                let unorderParent = $(this).parent();

                // filtering and updating the contacts array 
                contacts = contacts.filter(value => {
                    return value.id !== unorderParent.attr('id');

                });

                // removing the current ul
                $(this).parent().remove();
            });


            // update button
            $(`#update-${contactId}`).click(function() {
                // creating a new variable to get the current ul tag
                let unorderParent2 = $(this).parent();

                // getting a temporary array to get desire contact
                let currentContact = contacts.filter(value => {
                    return value.id === unorderParent2.attr('id');
                });

                // sending back the value to the form corresponding input boxes
                $('#fName').val(currentContact[0].name);
                $('#sName').val(currentContact[0].surName);
                $('#pNumber').val(currentContact[0].phone);
                $('#address').val(currentContact[0].address);

                // since the contact is sent to the form then the current contact is remove from the list
                let unorderParent = $(this).parent();
                contacts = contacts.filter(value => {
                    return value.id !== unorderParent.attr('id');
                });

                $(this).parent().remove();


            });


            // search button
            $('#searchButton').click(function() {

                // creating a new variable to get the surname 
                let searchContact = $('#searchBox').val();

                // function to iterate through every element within the array to find the desire surname
                contacts.forEach(value => {
                    // in case Users use lowercase to input the surname
                    if (value.surName === searchContact || value.surName.toLowerCase() === searchContact) {
                        // contacts get invisible
                        newUnorderList.hide();
                        // only the desire contact or contacts are displayed
                        $(`#${value.id}`).show();
                    }
                })

            });


            // reset button
            $("#resetButton").click(function() {

                // all contacts are visible again and the search input box is reset
                newUnorderList.show();
                $('#searchBox').val('');
            });

        }
        // the form is reset
        $('#form')[0].reset();
    });


});