function RemoveItem(thisRemoveBtn){

    var stadiumId = thisRemoveBtn.getAttribute("data-id");
    var intervalId = parseInt(thisRemoveBtn.getAttribute("data-intervalId"));
    var datePicked = thisRemoveBtn.getAttribute("data-datePicked");

    console.log(stadiumId, intervalId, datePicked);

    $.ajax({
        type: 'DELETE',
        url: '/cart',
        data:{
            stadiumId: stadiumId,
            intervalId: intervalId,
            datePicked: datePicked
        },
        success: (data) => {
            location.reload();
        }
    });
}