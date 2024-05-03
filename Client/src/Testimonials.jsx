// Testimonials.js
import React from 'react';

const Testimonials = () => {
    return (
        <div className="py-20">
            {/* Happy Clients Section */}
            <div className="bg-gray-50 py-20"> {/* Updated background color */}
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-[1.3px] first-letter:text-4xl">Our Happy Clients</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Testimonial 1 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaINAES5SOBPWKcpfKGgsNxHwlmffIUvlgsg&usqp=CAU"
                                alt="Client 1"
                                className="rounded-full mb-4"
                            />
                            <p className="text-lg font-medium uppercase tracking-wider first-letter:text-xl">Hindol Roy</p>
                            <p className="text-sm uppercase tracking-wider underline underline-offset-2">Google</p>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYYGRgaGiEaHBwcGhwaGhweHhoaGhgcGh4cIS4lHB4rIRwcKDgmKy8xNTY2GiQ7QDszPy40NTQBDAwMEA8QHhISHzYrJCw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0ND00NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NP/AABEIAOAA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYDBQcCAQj/xAA9EAABAwEFBgMFBQcFAQAAAAABAAIRAwQFEiExBkFRYXGBIpHwEzKhsdEHQlLB4RQVI2JygpIkM6LC8Rb/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/xAAiEQEBAAICAgIDAQEAAAAAAAAAAQIRAyESMSJRE0FhBKH/2gAMAwEAAhEDEQA/AOzIiICIiAiIgIiICIiAix1KgaCSQAMySYAHEncq3eO3NjouLS9znDKGNJzGoBMA9igtCLnVt+05gEU6Dydxe4AcsmyT0yWrqfaZaN1KkOuLy16oOsIuZ2f7TX5YrM0j+V5B7AtK3ll+0Kyu98VKfVuIf8JPwQXFFrrvviz1/wDarMed4a4Yh1bqO4WxQEREBERAREQEREBERAREQEREBERAREQEREBV3aLauhY/C446hEhgIkcC8/dB3cdwK87ZbTssNHFk6q6RSp5y8iJOX3WyCT0GpC4Vb7XUquc+o6XvcXOzEkniBk3ogsV9bT17Q4mo/CwnwsbIYOEcTz+S0r3RlB6Tr2+vBRfaQBrlvO4byZ93osLGEunKJkZ6j+p2/wAhyRKdVfA1E8Dn8Co9Sri4847ajd5eaxvqmT4Z3Rl2mNVGqvB015HL15KRLNq3AnlmSNy9MrEHI9v/AFQva5QTB1JnD8CIKxPtLRvy+PnuQ22FptTg4FpcHAyCCQ4HiDOS3tzfaLbaBGJ/tWb2VJcSOT/eB6kjkqiy0tdrPWfWaPtIAgjTfx3n1yUIfobZLbKhbmw3wVQJdTcc+ZafvN+I3gK0L8nstrmuBbIcILXCZBG8GJB7rqOwX2kVHPbQtZDmuybWMNIJIgP3Fv8AMYPVB19F8BX1AREQEREBERAREQEREBERAREQFAva8mWek6rUMNaJ3STuaJ1JU9cH+0nac2qsabHfwaZLWhueNwyc/pOQPDqYDTbTbQVLbaHVXeAAYWhp91gOTcRg5mSSBmTpuWhqvwaOzJnpqdeOS8VQWAS4Dfhbme+5RnP3/P4n4KBsqLXOGJxOEbp94xnpu1814bajOGSeJlwHA+7C8srTTws1Gp356x6yCzWK6HvHgYTnr6Ci5Se1pjb6ZxVDhibDoEEkYTl1Ovb5qI9gLiJg99Z4blnr2F9Lw4TOuY1HaOY7rWV3EuzEGfWcSFMylMsbPbNTZIjE2BujTdq7IGV4dYwMy4+YWWkCR4o6/mANMlliBplzg5ceX/qlVDqU2ga9dRPDVYn0yNDiHn2Ky1qg4x0006fmoswJBy4fUaKBlaQdMstM4Uixvgx67qGwRn5KXTbv3fIoOw/ZhtQ7ELJVcXNI/hOJktIElhP4YEjhBGkAdUX5y2breztNF2fhqsOWvvDjxzHccF+jVIIiICIiAiIgIiICIiAiIgIiIKt9ol8/sthqPBh74pM44n5EjmG4j2X5yfaCXGMtxP6rtn220XGyUXD3WVwXd2Pa34mO64vYLLjdB04/KOZPrJBms1ix6uyzneW8DGvPmob7vfJiHAcD+StNgu1heQQCBly/X9QrLddz08UlgIG7OD1G/oVxz5Zj7aMOC5zpRdlrBUrVS1rZbo5wGQ5aa8l127rraxgbGnxKz2aztaAGgNA3AAAdlsKQXDLK53f6bMOOceOp7ay1XOx4h4neM9O+5aa8Ni6Dxva7c4E5dZ1VxdTyUZ7VW7x9LTxy9xQWbB6zVPKG6eaxM2KLCZcH8zMnqr+Gry9qnzy+0fhw+nNLdsjMwI/9+GS1ztjHA+/PEDLtJ+i6faWLWvYq/kynW03gwvenOrXdAY2I05eS1VWmQInTTQeavl60pBVQtNKNcslp4c9zti58Jjenyw20gt3mR8NF+mbnvFloosrsnDUaHCdRxB5gyOy/KYOF8jT9PXmu4/YnXe6x1WGSxlchvKWMc5vmZ/uXdmdJREQEREBERAREQEREBERAREQVT7SrO1122jEPdYHt5Oa4FvnoeRK/O9N5aR69a/Er9DfadP7stMcGTlOXtaeLtEr85uMHn+aii7XbVkSCJ48zv+XwVvsQgBVbZm7HBjXPnjB47lbLOFg5cvLLp63BjccO22oPyUqmVAYZy+SmMaVONWyjPj5rFUC8lqQlu0SaYyFiKzuYsBYquiNVCi1G5KZUpkqJaclFOlcvDeqje+Rka/JXW2MzVSv+yENLgJ4/VdeHLV1WX/RjubiusYZiPW5d/wDsgsxZdzSQRjqPeJ4SGT08JXA6PiniPpP5L9MbEWY07BZmnX2TXHlj8cdsUdlsjzm/REUgiIgIiICIiAiIgIiICIvFR0AngJQVXbi303WW00TiLjScPCAQHYZbJPOF+frqo46zAdMQJ8/0XaRZcb3uJJLy4kEnDHCNFzCw3caNpNN7SC15aO0hvmI81wnJ5StefDOO4/8AV4pmGhYK15hk8uGeq94XObAyPb4So9eyNYC7DiOvOeu7rossklbMrbOnqlfRAkECc/oICxu2wLSZjlr9FFs7GPDyGOqYAXP9mAKbIEkOe/3tNwnkoVTA94YKdMk4MmVGPd/E90RgbJEQ6DlI5FaJNz0zZWy+1psG1tN4Adi5mMlYLNamuEtII5aLnVGzNpvLYLHAwRBEHg5p065gqy3cHAZZGFxzuq78ctnbeWm2NYM1oL32mFLINnLWfUKPetZwBMGeP1VaNP2rvHEDUuMNHDqUw7u6Z2yaid/9e4nd8/ksta/sbd3mjbLQpQ0sqEuOEYabR4gwvIAqCT4QTOYWvqupOgscPEJAezAXDkQBw4FdrJP0zy5fb2+9gQAV9qOD29l5bZWub7pB4fTcey8U6REg6Kl0vLl+1TZTLXuA3Fwz7wv0rspeLKtnphkgsYxrmu1ENAHUGDnyXBLuu/21qcwbyXO5NbHzJA7rqmwbMFoeM/Gwzn95rtfmu/nqzFm/DvG5fToiIi6uAiIgIiICIiAiIgIiIPixV2YmuHFpHmFmXwoTpQnVsAnfoO36yqNb6uO2h5EFxnfubH5LoV92UNe7LIEns7P6jsqXf1GLTQc0eEsOYGWLPI9vzWGbxyyn8ernrPDHL+xuLJTBCyWiwB7SDv3TC82AyAtxQZK5S9u1nSu2Cn7CQwYQdROR6jQ+SjWeyUqVQVG0mteDIkkgHiARCs1osrTqFEF2sn3POT81fyV8J9NbUf7Z2Itl3GBlxzAH5rcXbQE6Ry7J7JrAMgOQWeyHNVyy3dLTHU21O0NAQIGS112UmMeHkCQZbLZDeniiecStzfbcgodhId4TrvCmZaqLjtA2islG0vFR7SHCAS2IdGhgkwfoFrb1Yx7GUmtAaweHjO8k55zmrS+62u/QrNZrpY0zhk8Tmr3kv25/in0q9guksYJxdCcvJYrxohsZQrpaqQAyVUvdipMrcjLGTFXNnaxZanuEZhw7YmE/JdR2NGKviGmAn4gH8lQLhseB9R7oOI4W98yfgF0/YyiAahjQNHmST8gu875I4WePDVsREWpgEREBERAREQEREBERAREQaLaGjk14/pPQ5j8x3VSv2kAJHEAj5eua6DbaWJjhvIy66j4ql3rSljwciBodZGcLJzY6ylbv82e8bi0lgqZqx2KCqpZ34TzW+sdqCz+smze8W2qtAUR7woltvFrd+fDj0XizBzvE7LgN6tezHqMlUSVIswCiutQYIc0kaSAT5gKRYbSwyc/l8Cq+Pe1rl1phvMZZrTspnFiAW2ve3sDCd6r9O98sDWmeJED4pcd1Eyk9rDY64IC2TIhVazvOHwmOB3KVRvVzMniP5gZb+ndTIWtlbXiFTb1qDFktzeV4gjIz63qq2ioXOU4TeW3Lky1NNzcgEOLtJgDrqulbJ2bBQxHV7i7tk1vwE91zi4qcg8zAG8+tF1m7qJZTY06hoB6xmtPFPlayc+XwkS0RFoZBERAREQEREBERAREQEREHxRrTZGPBxNBJESQCR0JUlENuRVKRBI0IMH5L5SYcWpjI/MR8Fub+suC0PbGTjjHMOzy7yOyiU2QfXVefnjq2PUwy3jKxMpNBxHInTkFLZU3BY7XZXPADH4Z3/SVpKdktTKrWGsCzFBJbBA1a4Qc+BV9dIktqxupudu+vrRRrdZ3xlIPEarZWa5LQMJFVpkEukaERkM8wc88l5q2C2BuLCx2ujs8uRHJTq69G8d+1abdLwZlzjuJ3cdFjN3PHFWSpdlsdBwsaCQNc8+Q+qiW/Z2tFQuqmGtluERLiDrJMDTzTWWj4b9tMSWwpDKhImPpzVfdclSo8s9o+JiRvzzd0jRWix2YMaBuaOuijWkZSytXUoZPA0DoHSAY+KgGjC3Zp+AuP3iXHv+kLVWh8kNGfTeeSY+0Z606VsLdzBZqdQsbjcXHEWjEBiLRB1GQ+Ktah3VZfZUadP8DGtPUDM+cqYtkmo8/K7r6iIpQIiICIiAiIgIiICIiAiIgIiIKxtlYi6mKrRmzJ3Np+h+ZVNbWXVajAQQRIIgg6EHULmm0F1Os9SM/Zvza7X+w8x8RHNcOXDfbTwcmvjUiz1MQHFLxZkHDcoFlqRv8AXFbRjw7LJcr6asMtZMl12txwlrj4Z8JORnl2W5/euUFhnTVVl9new4qcHkcvIrC68KwOdE/5BWxyul88ePK7sWmtexI8LYMg6zvVbvq9jDpOZ+6DllpI7+oUJ941TIFJw5yojbG8mXwOQ17lRll0YzDHuRmu6TLjv9AL3arT4Y4r1OBucKu2u1lzuSjGbcs8u+0u327KAeSlbE2P9otbJ92n/EPPCRhH+Rb2lVqvUk5q9bMXbgs5LiWvqiSWktc1sHBhIzBE4p4nku/Dx7rPy8nTqARct2J2vrsrmyWx2OHmmHu98OGhcfvNdIgnMYhu06ku1mmWV9REUJEREBERAREQEREBERAREQEREBQr0sDK9N1N4yOh3g7iOYU1Ya9UNEntzO4JrY5DWc6jUfSf7zHETuMGJHIj5rZ2G04gI9aqHtG0ValR7DmHkTxLcnDzBWgst5Fj8weBGvdZ7j3Y2S2SWr6x/kvboK1FkvRjxkZUj94M/EudmnaZ7Z3OjNRKlXUpWtrSNVo7xvZgBDSkw3TLOSI17XhqBvPr8lpn1IlYbRapdiJ6KRYLA6o5sg5nJu930HrJdZjpm8ranbP3aa1Rsg4Zk8wNe31XSnjKBoPgot0XaKLIyxH3j8gOQWu2yvH2NnLWnx1JY3iB993YZdXBbeLHxx7Z+TLyvTn16W32lepUGjnmP6R4WnyAXZNhNov2qhhef4tOGu4uH3X99DzHMLiTGrY3Fer7LWZVYc26jc5p95p5H4ZHcq5TakfodFrblvSnaaTatMy05Eb2uGrTzH0O9bJc1hERAREQEREBERAREQERY6jw0EuIAGZJMAdSdEHtfVVLz27stKQ1xquH4BLf8jke0qj31t3aK8tYfYs4NPjPV2vlHdTMbUbdTvO96Nnbiq1Gt5TLj0aMyqdZNonWy2BrZbSYxxaDqTAbidz8Wm6VzV9oL3ZnmefdWbYep/qHO4M/7t+hXXHDtFqLddqLqlopvMup1M+rhJ/5Ylit1jDj+az7S2T9mvMVPuWlvYPaBv5j5lTK9Kc1g5fhyV6PF8+OfxU7RZXszaTHEGFEfa3jIuerLaKJ4fMfLVQDd0nP15qZyz9q3iv6af8AeD4gF/wC+NY924Dmcz2W/ZdfBpUqhdLnODGiXHQDM9TuA5p+W71ifh/eTSWSxQRkXvOQ3meDQuj7O3H7EY3wahHZo4D8ypFxbOMs/jd4qhGbtzf5WcOZ1PwW5hauLj18svbLycm/jj6YSPXzXKtory/aa7ng+BvgZ/SDr/cZPkrvttePsqPs2nx1Zb0YPfPf3f7jwXOmt+HoBdrXFiwoGrMWL41ijQ3WzG0lSxPOEBzXRiaZgxOYP3XROfzXV7i2loWoDA7C/ex0B3bcR0+C4fh8Q5CfyH5qQx0EEEgjMEfCI9ZKtx2mV+hEXKbj27rUYbW/is46PaOp97v5rot1XzRtDcVKoHcRo4dQc++i53GxMrZIiKEiIiAiLV37fNOyUjUqHk1o95ztzWj89yDZyq5eu2FmoS3FjcPus8UdXe6POeS5lf21dotRIc4sp/gaSGx/Mfv9/ILQueVeYfau14vX7RqzpFJraY4+87zOXwVUvC+a9f8A3ar3jUAuOEdG6BQmhfCFeTXpAahWMuXp5hYlIyNlWnYZ49vVaN1Nu/i4qsU2yVY9hGf6mvwFNg83v+itj7Kum0FxtttnNMnC9hDqb/wub7vY6HkVU7ttDiCyo0sqUzge06hw16g6g7wQV0WzKFfdwNrkVGEMqtEYoycPwvG8cDu8wc/+ji8517af8/N4Xv0qzGgrK2n08gsdeyvY7C9uF3DcebTvC2l1XO+pDny1n/J3SdBz+a86ceVvjrt6OXJhMfK3pHstgdVdhbu1J0b1+isthu1lEQwS46uOp+g5KbZ6DWNDWNAA3fXmsgavQ4eHHCf153Nz5cnX6RTTXgshS3NWg2qt/sqJDT46ngbxE+8R0HxIWiMzn+0NvNeu98+EHAzhhaTn3MnuFrS0aaHfwlSXU/IevXRYCEoxlq9MC9I94a0ujQTkoEemCS53EwOjcvnKktbAXmkzCAOAXsoPJUmy2pzHBzHFrhoWkgjyKjxyX0D167IL7cm3bxDbQ3GPxNEOHUaO7R3V6sNvp1m4qbw4ctR1Go7rg8qVYrxqUXYqbnNcN4Pz4jqq3GX0mV3lFyX/AO+tf4mf4BfFTwqdur1aga0ucYDQSSdwAklcM2qvt9rrueZDBkxu5rfqdTz6BdG+0i9fY2b2YMOqkt/tGb/OWt/uK5Ewfqpxn7Ra+AL6QvQX3euiHmF5csrx8FjIQYYkxCz06K9U6eeayvcmh4pDxZK1bA05Nofxexn+LS7/ALqr0G5q97DUMNmxfjqPd5HAPg1XxKtdN4aCSQABJJMAAakyqveW09Su17bC5jBoKrhiLubG6BvBzpncNCaz9od/PqO/ZKBIYP8AcI++dzJ/CN435cwtRYyWeB7AHADdxAMjsr44S3eTly53GfFcLtv3A1lO0sLntOIvquaQ905lr3QG9DHBXuw2xlVgex0jfpI5Fc0sjGuEZxwxGDu0JjePnvX1rWWNzq1OWPg5gnC4xkHsEB4nPTfIMq2XDPcUx576ydTC9AKrbP7YWe0v9mHBlXcwnJ44sJ1P8pzEHUZqzArPZrppl3Nx8quABJMACSToOMrl20N6GvUx/cHhYOAnXv8AkB0t+2d4YKQptPiqaxqGDXzMDpK5/UM9PWSmTpFYniPXFYoXs5ZeivikeeywWkZAcXAfGT8lKhR7U04mcMX/AEd67KoytK+TyC9AL0B69dFYeeyOI9H9F9O5eSd6Dy4dfL9V4LfWa9OC+OVR4w+pCL3A4H4Ig//Z"
                                alt="Client 2"
                                className="rounded-full mb-4"
                                height={170}
                                width={170}
                            />
                            <p className="text-lg font-medium uppercase tracking-wider first-letter:text-xl">Aritra Saha</p>
                            <p className="text-sm uppercase tracking-wider underline underline-offset-2">LinkedIn</p>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUtjZdZBmggvkx8r4UIBI4VZ05zVbHXQ7zBw&usqp=CAU"
                                alt="Client 3"
                                className="rounded-full mb-4"
                                height={180}
                                width={180}
                            />
                            <p className="text-lg font-medium uppercase tracking-wider first-letter:text-xl">Rashid Mazhar</p>
                            <p className="text-sm uppercase tracking-wider underline underline-offset-2">Microsoft</p>
                        </div>
                        {/* Testimonial 4 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://i0.wp.com/events.indiafoodforum.com/wp-content/uploads/2018/10/JP-Meena-IAS-MOFPI.jpg?fit=200%2C250&ssl=1"
                                alt="Client 4"
                                className="rounded-full mb-4"
                                height={150}
                                width={150}
                            />
                            <p className="text-lg font-medium uppercase tracking-wider first-letter:text-xl">Ayan Bera</p>
                            <p className="text-sm uppercase tracking-wider underline underline-offset-2">Meta</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Partners Section */}
            <div className="bg-gray-100 py-20"> {/* Updated background color */}
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-[1.3px] first-letter:text-4xl">Our Partners</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Partner 1 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://blog.hubspot.com/hs-fs/hubfs/image8-2.jpg?width=600&name=image8-2.jpg"
                                alt="Partner 1"
                                height={500}
                                width={300}
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 2 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png"
                                alt="Partner 2"
                                height={500}
                                width={300}
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 3 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                                height={500}
                                width={300}
                                alt="Partner 3"
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 4 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
                                alt="Partner 4"
                                className="mb-4"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
