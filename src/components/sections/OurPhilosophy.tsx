import Image from "next/image"
import Link from 'next/link'
import Button from '@/components/shared/Button'

export default function OurPhilosophy() {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-6xl font-gloria text-[#0E26A5]">Our Philosophy</h2>
              <p className="text-2xl font-verdana">
                For pupils, we bring light to the other side of the world. 
                For teachers, we highlight that by giving, we gain so much more. 
                <strong>Together, we create opportunities for growth and impact.</strong>
              </p>
              <Link href="/learn-more" className="text-3xl font-gloria text-white">
                <Button variant="secondary">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Image 
                src="/images/ourPhilo.jpeg" 
                alt="Our Philosophy" 
                width={800}
                height={500}
                className="rounded-l-[50px] w-full h-[500px] object-cover"
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-12 right-12">
                <Image src="/images/stars1_2.png" alt="" width={48} height={48} className="object-contain" />
              </div>
              <div className="absolute bottom-12 left-12">
                <Image src="/images/stars1_2.png" alt="" width={48} height={48} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  