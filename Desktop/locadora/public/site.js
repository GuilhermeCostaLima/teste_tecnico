(function(){
    $('#clientes').on('click','.js-delete',function(){
        let botaoclicado = $(this)
        $('#btnsim').attr('data-id',botaoclicado.attr('data-id'))
        $('#meumodal').modal('show')
    })

    $('#btnsim').on('click', function(){
        let botaosim = $(this)
        let codcliente = botaosim.attr('data-id')
        $.ajax({
            url: '/clientes/delete/' + codcliente,
            method: 'GET',
            success: function(){
                window.location.href = '/clientes'
            }
        })
    })
})()