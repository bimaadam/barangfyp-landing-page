import { NextRequest, NextResponse } from 'next/server'
import { products } from '../..//data/products'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const pathname = url.pathname
    const slug = pathname.split('/go/')[1]

    if (!slug) {
        return NextResponse.json({ error: 'Slug not provided' }, { status: 400 })
    }

    const product = products.find((p) => p.slug === slug)

    if (!product) {
        return NextResponse.redirect('https://barangfyp.store/404', 302)
    }

    const ip =
        req.headers.get('x-forwarded-for') ||
        req.headers.get('x-real-ip') ||
        'no-ip'

    console.log(
        `[CLICK] ${new Date().toISOString()} | ${slug} | ${ip}`
    )

    return NextResponse.redirect(product.affiliateUrl, 302)
}
