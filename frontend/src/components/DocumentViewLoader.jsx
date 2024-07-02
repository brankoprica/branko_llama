import React from 'react'
import { Skeleton } from './ui/skeleton'
import Navbar from './Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

function DocumentViewLoader() {
    return (
        <>
            <div class="lg:flex lg:gap-8 sm:gap-4 mx-4 sm:inline">
                <div class="lg:w-1/6 w-full my-8 mx-auto">
                
                    <h2 className="text-2xl font-bold mb-6 text-center">Filter</h2>
                    <div className="grid grid-cols-1 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-center mb-4">Tags</h3>
                        <div className="grid grid-cols-2 gap-2">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="h-4 w-3/4" />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-center mb-4">Exams</h3>
                        <div className="grid grid-cols-2 gap-2">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="h-4 w-3/4" />
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                <div class="lg:w-5/6 w-full">
                    <div className=" mx-auto my-8">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl">Documents</h1>
                    </div>
                    <div className=" mx-auto my-4">
                        <ul>
                        {[...Array(2)].map((_, index) => (
                            <li class="my-4">
                                <Card>
                                    <CardHeader className='pb-2 px-6 pt-6'>
                                        <CardTitle>
                                            <Skeleton className="w-1/3 h-10" />
                                        </CardTitle>
                                        <CardDescription>
                                            <Skeleton className="w-1/5 h-12" />
                                        </CardDescription>
                                        <Separator orientation="horizontal" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="w-full h-28"/>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
  )
}

export default DocumentViewLoader
