export function Footer() {
  return (
    <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
      <div className="container flex px-3 py-8 ">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full lg:w-1/2 ">
            <div className="px-3 md:px-0">
              <h3 className="font-bold text-gray-900">About</h3>
              <p className="py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse
                consectetur dapibus velit ut lacinia.
              </p>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
            <div className="px-3 md:px-0">
              <h3 className="font-bold text-gray-900">Social</h3>
              <ul className="list-reset items-center pt-3">
                <li>
                  Cupcake ipsum dolor sit amet fruitcake danish lollipop.
                  Liquorice I love bonbon cotton candy pastry sweet roll
                  shortbread. Cheesecake pudding jelly-o tootsie roll I love
                  candy powder. Macaroon chupa chups chocolate cake I love bear
                  claw.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
