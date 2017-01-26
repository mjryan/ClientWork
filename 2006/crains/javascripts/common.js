// stock quote stuff
function getStockDirection(d,write) 
{
    var c;
    var delta=parseFloat(d);
    if (delta<0) 
    {
	c='Down';
    }
    else 
    {
	c='Up'
    }
    if (write)
    {
        document.write('<td class="' + c + '">');
    }
    else
    {
        return (c);
    }
}




function getStockInfoD(d,q)
{
    var dir = getStockDirection(d);
    document.write('<span title="' + dir + ' ' + d + ' ' + q + '">' + d + ' ' + '</span>');
}

function getStockInfoQ(d,q)
{
    var dir = getStockDirection(d);
    document.write('<span title="' + dir + ' ' + d + ' ' + q + '">' + ' ' + q + '</span>');
}