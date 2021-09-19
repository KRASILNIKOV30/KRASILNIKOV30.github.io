const x = 10, y = 20;

function plus(first, second, third)
{
    if (third != null)
    {
        console.log(first + second + third)
    }
    else
    {
        console.log(first + second)
    }
}

plus(x, y);
plus(x, y, 70);