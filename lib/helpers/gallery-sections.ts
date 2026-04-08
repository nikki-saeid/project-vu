export const generateGallerySections = (images_urls: string[], title: string) => {
    // 0 image
    if (images_urls.length === 0) return [];
    const section1 = {
        images: [
            {
                src: images_urls[0],
                alt: title,
            },
        ],
    };

    // 1 image
    if (images_urls.length === 1) return [section1];

    // 2,3,4,5 images
    const section2 =
        images_urls.length === 2
            ? {
                  images: [{ src: images_urls[1], alt: title }],
              }
            : images_urls.length === 3
              ? {
                    className: 'grid grid-cols-1 grid-rows-2 gap-4',
                    images: images_urls.slice(1, 3).map((image) => ({ src: image, alt: title })),
                }
              : images_urls.length === 4
                ? {
                      className: 'grid grid-cols-2 grid-rows-2 gap-4 [&>*:nth-child(3)]:col-span-2',
                      images: images_urls.slice(1, 4).map((image) => ({ src: image, alt: title })),
                  }
                : {
                      className: 'grid grid-cols-2 grid-rows-2 gap-4',
                      images: images_urls.slice(1, 5).map((image) => ({ src: image, alt: title })),
                  };

    return [section1, section2];
};
