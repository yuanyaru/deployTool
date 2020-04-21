(function()
{
    const communicator = Ice.initialize();
    exec = document.getElementById("exec");
    exec.addEventListener('click', function (evt) {
        sh = document.getElementById("sh").value;
        alert(sh);
    });
    async function printString()
    {
        try
        {
            setState(State.Busy);
            //服务端在本地
            // const hostname = document.location.hostname || "127.0.0.1";
            //服务端在远端
            const hostname = "192.168.100.61";
            const proxy = communicator.stringToProxy(`SimplePrinter:ws -h ${hostname} -p 10000`);
            const printer = await Demo.PrinterPrx.checkedCast(proxy);
            if(printer)
            {
                // await printer.printString("Hello ice in browser !");
                await printer.printString(sh);
            }
            else
            {
                $("#output").html("Invalid proxy");
            }
        }
        catch(ex)
        {
            $("#output").html(ex.toString());
        }
        finally
        {
            setState(State.Idle);
        }
    }
    const State =
        {
            Idle: 0,
            Busy: 1
        };
    function setState(newState)
    {
        switch(newState)
        {
            case State.Idle:
            {
                // Hide the progress indicator.
                $("#progress").hide();
                $("body").removeClass("waiting");
                // Enable the button
                $("#print").removeClass("disabled").click(printString);
                break;
            }
            case State.Busy:
            {
                // Clear any previous error messages.
                $("#output").html("");
                // Disable buttons.
                $("#print").addClass("disabled").off("click");
                // Display the progress indicator and set the wait cursor.
                $("#progress").show();
                $("body").addClass("waiting");
                break;
            }
        }
    }
    setState(State.Idle);
}());