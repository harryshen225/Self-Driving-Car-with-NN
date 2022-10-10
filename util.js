function lerp(A, B, t) {
    return A + (B - A) * t
}


function getIntersection(A, B, C, D) {
    //use Cramer's rule
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            // console.log(A, B, C, D);
            // if (t == 1) {
            //     console.log(tTop, uTop, bottom);
            // }

            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
        return null;
    }
}

function polyIntersection(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                    poly1[i],
                    poly1[(i + 1) % poly1.length], //taking one point and the next point in the first polygon and connect them together
                    //making segment from other piont to the other
                    //if i reaches the end, then (i+1) will return error. But what we want when it reaches to the end of the array, we want 
                    //the final point connects back to the first point. (i+1)%poly1.length will turn it to the first point-ploy1[0] 
                    poly2[j],
                    poly2[(j + 1) % poly2.length],
                )
                // console.log(touch);
            if (touch) {
                // console.log(poly1[i]);
                // console.log(poly1[(i + 1) % poly1.length]);
                // console.log(poly2[j]);
                // console.log(poly2[(j + 1) % poly2.length]);
                return true
            }
        }
    }
    return false;
}

function getRGBA(value) {
    const alpha = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
}